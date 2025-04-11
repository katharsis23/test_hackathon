import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random
import os
from dotenv import load_dotenv

load_dotenv(r"D:\projects\test_hackathon\backend\.env")

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def generate_code():
    code = random.randint(100000, 999999)
    return code


def send_code_via_gmail(to_email: str, code: str):
    sender_email = EMAIL_USER
    app_password = EMAIL_PASS

    subject = "Код підтвердження"
    html_content = f"<h3>Ваш код: <strong>{code}</strong></h3>"

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(html_content, "html"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, app_password)
        server.send_message(msg)
