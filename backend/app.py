from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt
import jwt
import datetime
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'your_secret_key'

# MongoDB setup
client = MongoClient("mongodb+srv://SanthoshKumar12:Santhosh12@cluster-0.yrvboac.mongodb.net/")
user_db = client["user_db"]
users_collection = user_db["users"]
otp_collection = user_db["otp_verification"]
pending_users_collection = user_db["pending_users"]

admin_db = client["admin_db"]
admin_collection = admin_db["admins"]

db = client["Materials_db"]
collection = db["Materials"]

# =================== Helper Functions ===================


def generate_otp():
    return str(random.randint(100000, 999999))


def send_otp_email(to_email, otp):
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_username = "attisanthoshkumar156@gmail.com"
    smtp_password = "shqr zdez dsov jzll"

    subject = "Your OTP Code"
    body = f"Your OTP code for registration is: {otp}. It will expire in 5 minutes."
    msg = MIMEMultipart()
    msg['From'] = smtp_username
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)
            server.sendmail(smtp_username, to_email, msg.as_string())
        return True
    except Exception as e:
        print("Error sending email:", e)
        return False


def convert_user(user):
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "password": user["password"].decode() if isinstance(user["password"], bytes) else user["password"]
    }


def serialize(doc):
    doc['_id'] = str(doc['_id'])
    return doc

# =================== Routes ===================


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data["username"]
    email = data["email"]
    password = data["password"]

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered"}), 400

    pending_users_collection.delete_many({"email": email})
    hashed_pw = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    otp = generate_otp()

    if not send_otp_email(email, otp):
        return jsonify({"message": "Failed to send OTP"}), 500

    pending_users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_pw,
        "otp": otp,
        "created_at": datetime.datetime.utcnow()
    })

    return jsonify({"message": "OTP sent to your email"}), 200


@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data["email"]
    otp_input = data["otp"]

    pending_user = pending_users_collection.find_one({"email": email})
    if not pending_user:
        return jsonify({"message": "No pending registration found"}), 404

    if (datetime.datetime.utcnow() - pending_user["created_at"]).seconds > 300:
        pending_users_collection.delete_one({"email": email})
        return jsonify({"message": "OTP expired"}), 400

    if pending_user["otp"] != otp_input:
        return jsonify({"message": "Invalid OTP"}), 400

    users_collection.insert_one({
        "username": pending_user["username"],
        "email": pending_user["email"],
        "password": pending_user["password"],
        "is_verified": True
    })

    pending_users_collection.delete_one({"email": email})
    return jsonify({"message": "User successfully registered"}), 201


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = users_collection.find_one({"email": email})
        if not user:
            return jsonify({"message": "Invalid email or password."}), 401
        if not user.get("is_verified", False):
            return jsonify({"message": "Email not verified. Please verify your account."}), 403
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"]):
            return jsonify({"message": "Invalid email or password."}), 401

        token = jwt.encode({
            "email": user["email"],
            "username": user["username"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({"message": "Login successful", "token": token}), 200

    except Exception as e:
        return jsonify({"message": "An error occurred during login.", "error": str(e)}), 500


@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data['email']
    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "Email not found"}), 404

    reset_token = jwt.encode({
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    reset_link = f"https://material-recommendation-frontend.vercel.app/reset-password?token={reset_token}"

    subject = "Password Reset Request"
    body = f"""
    Hi,

    Click the following link to reset your password. This link is valid for 15 minutes:

    {reset_link}

    If you didn't request a password reset, please ignore this email.

    Thanks.
    """

    try:
        msg = MIMEMultipart()
        msg['From'] = "attisanthoshkumar156@gmail.com"
        msg['To'] = email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("attisanthoshkumar156@gmail.com", "shqr zdez dsov jzll")
            server.sendmail(msg['From'], msg['To'], msg.as_string())

        return jsonify({"message": "Password reset link sent to your email"}), 200
    except Exception as e:
        print("Email sending failed:", e)
        return jsonify({"message": "Failed to send email"}), 500


@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    token = data['token']
    new_password = data['new_password']

    try:
        decoded = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        email = decoded['email']
        hashed_pw = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        users_collection.update_one({"email": email}, {"$set": {"password": hashed_pw}})
        return jsonify({"message": "Password reset successful"}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Reset link expired"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid or tampered reset token"}), 400


@app.route('/users', methods=['GET'])
def get_users():
    users = user_db.users.find()
    return jsonify([convert_user(user) for user in users])


@app.route("/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    result = users_collection.delete_one({"_id": ObjectId(user_id)})
    return jsonify({"message": "User deleted" if result.deleted_count else "User not found"}), 200


@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    email = get_jwt_identity()
    user = users_collection.find_one({"email": email})
    if user:
        return jsonify({"username": user["username"], "email": user["email"]}), 200
    return jsonify({"message": "User not found"}), 404


@app.route("/materials", methods=["GET", "POST"])
def materials():
    if request.method == "GET":
        return jsonify([serialize(doc) for doc in collection.find()])
    elif request.method == "POST":
        collection.insert_one(request.json)
        return jsonify({"message": "Material added"}), 201


@app.route("/materials/<id>", methods=["PUT", "DELETE"])
def modify_material(id):
    if request.method == "PUT":
        data = request.json
        data.pop("_id", None)
        result = collection.update_one({"_id": ObjectId(id)}, {"$set": data})
        return jsonify({"message": "Updated" if result.matched_count else "Not found"}), 200
    elif request.method == "DELETE":
        collection.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Deleted"}), 200


@app.route('/api/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    admin = admin_collection.find_one({"username": username})
    if admin and bcrypt.checkpw(password.encode('utf-8'), admin['password']):
        return jsonify({"message": "Login successful", "status": "success"}), 200
    return jsonify({"message": "Invalid credentials", "status": "fail"}), 401


@app.route("/recommend", methods=["POST"])
def recommend_material():
    data = request.json
    query = {
        "Cost_Per_Unit": {"$lte": data.get("budget")},
        "Durability": {"$gte": data.get("min_durability")}
    }
    if data.get("environmental_suitability"):
        query["Environmental_Suitability"] = data["environmental_suitability"]
    results = list(collection.find(query, {"_id": 0}))
    return jsonify(results)


# =================== Main ===================
if __name__ == '__main__':
    app.run(debug=True)
