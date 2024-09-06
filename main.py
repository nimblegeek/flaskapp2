import os
import psycopg2
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ['PGHOST'],
        database=os.environ['PGDATABASE'],
        user=os.environ['PGUSER'],
        password=os.environ['PGPASSWORD'],
        port=os.environ['PGPORT']
    )
    return conn

# Create users table if not exists
def create_users_table():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE
        )
    ''')
    conn.commit()
    cur.close()
    conn.close()

# Create users table on startup
create_users_table()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/explore_open_mats")
def explore_open_mats():
    return render_template("explore_open_mats.html")

@app.route("/users")
def get_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users')
    users = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([{"id": user[0], "name": user[1], "email": user[2]} for user in users])

@app.route("/signup", methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    
    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, email))
        conn.commit()
        return jsonify({"message": "User created successfully"}), 201
    except psycopg2.IntegrityError:
        conn.rollback()
        return jsonify({"error": "Email already exists"}), 400
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
