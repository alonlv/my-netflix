import json
import os

from flask.helpers import make_response, send_file
from sqlite_client import *

from flask import Flask, send_from_directory, jsonify
from flask import Response, request
from functools import wraps

ROOT_FOLDER = "../build"
PATH = 'index.html'
COON = create_connection()
create_table(COON)

app = Flask(__name__, static_folder=os.path.join(ROOT_FOLDER))

class NetflixResponse(object):
    def __init__(self, data, status="success", http_status_code=200, http_extra_headers=None):
        self.data = data
        self.status = status
        self.http_status_code = http_status_code
        self.http_extra_headers = http_extra_headers

    def dictify(self):
        return {"status": self.status, "data": self.data}

def response_wrapper(func):
    @wraps(func)
    def wrapper(**params):

        try:
            func_result = func(**params)
            if type(func_result) is Response:
                return func_result

            response = NetflixResponse(func_result)

        except Exception as err:
            response = NetflixResponse(str(err), "error", 500, {})

        return _make_http_response(response.dictify(), response.http_status_code, response.http_extra_headers)

    return wrapper

def _make_http_response(content=None, status_code=200, extra_headers=None, mimetype="application/json"):
    extra_headers = extra_headers or {}

    if content is None:
        content_string = ""
        mimetype = "text/plain"
    else:
        if mimetype == "application/json":
            content_string = json.dumps(content)
        else:
            content_string = content

    return Response(content_string, status_code, extra_headers, mimetype)

is_task_currently_running = False
# this is a function that serves all your UI files - just make sure to edit ROOT_FOLDER to match your project structure
@app.route('/', defaults={'path': PATH})
@app.route('/<path:path>', methods=["GET"])
def files(path):
    return send_from_directory(ROOT_FOLDER, path)

@app.route('/toggleMovie', methods=["GET", "POST"])
@response_wrapper
def toggleMovie():
    Movie = json.loads(request.data)
    sqlcommentd = f"INSERT INTO 'Favorites' (imdbID, Title, Poster, Year) VALUES ('{Movie['imdbID']}', '{Movie['Title']}', '{Movie['Poster']}', '{Movie['Year']}')"
    if execute_query(COON, f"SELECT * FROM 'Favorites' WHERE imdbID='{Movie['imdbID']}'") != []:
        sqlcommentd = f"DELETE FROM 'Favorites' WHERE imdbID='{Movie['imdbID']}'"
    execute_command(COON, sqlcommentd)
    return send_from_directory(ROOT_FOLDER, PATH)


@app.route('/GetFavorites', methods=["GET", "POST"])
def getFavorites():
        data = execute_query(COON, "SELECT * FROM 'Favorites'")
        dic_data = {"Response": "True", "Search":[]}
        for movie in data:
            dic = {"imdbID":movie[0], "Year":movie[3],"Title":movie[1], "Poster":movie[2]}
            dic_data["Search"].append(dic)
        return make_response(dic_data)

        
@app.route('/GetFavoritesID', methods=["GET", "POST"])
def GetFavoritesID():
        data = execute_query(COON, "SELECT imdbID FROM 'Favorites'")
        dic_data = {"Response": "True", "Search":[]}
        for movie in data:
            dic = {"imdbID":movie[0]}
            dic_data["Search"].append(dic)
        return make_response(dic_data)

if __name__ == '__main__':
    app.run("0.0.0.0", 80, debug=True)