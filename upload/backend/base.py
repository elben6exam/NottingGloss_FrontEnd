from flask import Flask, request,jsonify

app = Flask(__name__)

class gloss_word:
    def __init__(self,word,is_display = True, definition = 'default'):
        self.word = word
        self.is_display = is_display
        self.definition = definition

@app.route("/upload_text", methods=["POST","Get"], strict_slashes=True)
def get_query_from_react():
    data = request.get_json()

    return jsonify({
        "data": text_slice(data['data'])
    })




@app.after_request
def set_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response

def text_slice(sentence):
    words = []
    for i in sentence.split():
        word = gloss_word(i)
        d = {}
        d["word"] =  word.word + ' '
        d["is_display"] = word.is_display
        d["definition"] = word.definition
        words.append(d)

    return words


    
    
