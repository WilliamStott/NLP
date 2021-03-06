package CorePipeline;

import java.util.Properties;
import java.util.List;

import edu.stanford.nlp.ling.CoreAnnotations.PartOfSpeechAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations.TokensAnnotation;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.util.CoreMap;
import edu.stanford.nlp.ling.CoreAnnotations.SentencesAnnotation;



//This is the Parts of Speech annotator class
public class POS {

	private Properties props = new Properties();
	private StanfordCoreNLP pipeline;
	private int lineNumb = 0;

	//Adds properties when constructed
	public POS()
	{
		props.setProperty("annotators", "tokenize, ssplit, pos");
		pipeline = new StanfordCoreNLP(props);
	}

	/**
	 * Process a string of text and return the porcessed data. 
	 * @param  String - A string of data to be processed
	 * @return String - returns a string of processed data.
	 */
	public String process(String text)
	{
		// create an empty Annotation just with the given text
		Annotation document = new Annotation(text);

		// run all Annotators on this text
		pipeline.annotate(document);

		// these are all the sentences in this document
		// a CoreMap is essentially a Map that uses class objects as keys and has values with custom types
		List<CoreMap> sentences = document.get(SentencesAnnotation.class);

		for(CoreMap sentence: sentences) 
		{
			// traversing the words in the current sentence
			// a CoreLabel is a CoreMap with additional token-specific methods
			String pos = "";
			for (CoreLabel token: sentence.get(TokensAnnotation.class)) 
			{
				//Adds both the original and the converted text to the return string
				pos += String.format("[\"%s\" %s]", token.originalText(), token.get(PartOfSpeechAnnotation.class));
			}
			//Returns the data.
			return String.format("[Line %s %s]", ++lineNumb, pos);
		}

		return "Failed to process this line";
	}

}
