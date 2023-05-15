from flask import Flask, render_template, request
from color_palette_generator import get_colors_davinci, get_colors_gpt_turbo


# creating a Flask app
app = Flask(__name__,
            template_folder="templates",
            static_url_path= "",
            static_folder="static"     
        )


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/palette", methods=["POST"])
def get_palettes():
    # get the POST data i.e Text user inputted
    text = request.form.get("text")
    # OpenAI completion
    colors = get_colors_gpt_turbo(text)
    app.logger.info(colors)
    return {"colors":colors}


if __name__ == "__main__":
    app.run(debug=True)