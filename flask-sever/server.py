from flask import Flask, request, jsonify
import mtranslate
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch
import translate

from flask import Flask
app=Flask(__name__)


app = Flask(__name__)


def translate_malayalam_to_english(text):
    translated_text = mtranslate.translate(text, "en", "ml")
    return translated_text
  
def generate_summary(text):
    model_name = "t5-base"
    tokenizer = T5Tokenizer.from_pretrained(model_name)
    model = T5ForConditionalGeneration.from_pretrained(model_name)

    # Tokenize and convert text to tensor
    inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=512, truncation=True)

    # Generate summary
    summary_ids = model.generate(inputs, max_length=150, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary



def translate_to_malayalam(text):
    translator = translate.Translator(from_lang='en', to_lang='ml')
    translated_text = translator.translate(text)
    return translated_text


@app.route("/summarize", methods=['POST'])
def summarize():
    data = request.get_json()
    text = data['text']
    translated_text = translate_malayalam_to_english(text)
    #print("Translated text:", translated_text)

    summary = generate_summary(translated_text)
    #print("\nGenerated Summary:", summary)

    translated_summary = translate_to_malayalam(summary)
    #print("Translated Summary:", translated_summary)

    
    return jsonify({'summary': translated_summary})


if __name__ == '__main__':
    app.run(debug=True)
