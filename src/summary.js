import mtranslate from 'mtranslate';
import { T5Tokenizer, T5ForConditionalGeneration } from 'transformers';
import translate from 'translate';

async function summarizeText(text) {
  const translateMalayalamToEnglish = (text) => {
    const translated_text = mtranslate.translate(text, "en", "ml");
    return translated_text;
  };

  const translateToMalayalam = (text) => {
    const translator = translate.Translator(from_lang='en', to_lang='ml');
    const translated_text = translator.translate(text);
    return translated_text;
  };

  const malayalam_text = translateMalayalamToEnglish(text);
  console.log("Translated text:", malayalam_text);

  const tokenizer = new T5Tokenizer.from_pretrained('t5-base');
  const model = new T5ForConditionalGeneration.from_pretrained('t5-base');

  const input_text = malayalam_text;
  const summary = generate_summary(input_text);
  console.log("Original Text:", input_text);
  console.log("\nGenerated Summary:", summary);

  const translated_texttomal = translateToMalayalam(summary);
  console.log("Translated text:", translated_texttomal);

  return translated_texttomal;
}

async function generate_summary(text) {
  // Tokenize and convert text to tensor
  const inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=512, truncation=true);

  // Generate summary
  const summary_ids = model.generate(inputs, max_length=150, length_penalty=2.0, num_beams=4, early_stopping=true);
  const summary = tokenizer.decode(summary_ids[0], skip_special_tokens=true);

  return summary;
}

export default summarizeText;