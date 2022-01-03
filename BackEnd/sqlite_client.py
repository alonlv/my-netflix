import sqlite3
from sqlite3 import Error
db_Name = ".\\pythonsqlite.db"
Table ="CREATE TABLE IF NOT EXISTS 'Favorites' ('imdbID' TEXT, 'Title' TEXT, 'Poster' TEXT, 'Year' INTEGER, PRIMARY KEY('imdbID'))"""

def create_connection(db_file=db_Name):
    """ create a database connection to a SQLite database """
    conn = None
    try:
        conn = sqlite3.connect(db_file, check_same_thread=False)
        return conn
    except Error as e:
        print(e)

    return conn

def Delate_Data(conn):
    """ Deleate movie"""
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM 'Favorites'")
        conn.commit()

    except sqlite3.Error as error:
        print(error)


def create_table(conn, create_table_sql=Table):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def execute_command(conn, command):
    try:
        cursor = conn.cursor()

        cursor.execute(command)
        conn.commit()
        cursor.close()

    except sqlite3.Error as error:
        print(error)
    
def execute_query(conn, query):
    try:
        cursor = conn.cursor()

        cursor.execute(query)
        return cursor.fetchall()

    except sqlite3.Error as error:
        print(error)
    

if __name__ == '__main__':
    create_connection(db_Name)