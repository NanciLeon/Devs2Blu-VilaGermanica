# Module Imports 
import mariadb
import sys

# Conecte-se à plataforma MariaDB, 
con = mariadb.connect (
    user = "db_user" ,
    senha = "" ,
    host = "127.0.0.1" ,
    porta = 3306 ,
    dbname = "usuario"

    )
alert('No arquivo')
if con.is_connected():
    a = con.get_server_info()
    print('Conectado')

# Get Cursor 
cur = con.cursor ()