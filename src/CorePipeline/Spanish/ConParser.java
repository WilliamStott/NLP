package CorePipeline.Spanish;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.parser.lexparser.LexicalizedParser;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.util.CoreMap;
import edu.stanford.nlp.ling.CoreAnnotations.SentencesAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations.TokensAnnotation; 

public class ConParser {

	private Properties props = new Properties();
	private StanfordCoreNLP pipeline;
	private LexicalizedParser lp;
	private int lineNumb = 0;

	public ConParser()
	{
		props.setProperty("annotators", "tokenize, ssplit, pos, parse");
		props.setProperty("tokenize.language", "es");
		props.setProperty("pos.model", "edu/stanford/nlp/models/pos-tagger/spanish/spanish-distsim.tagger");
		lp = LexicalizedParser.loadModel("edu/stanford/nlp/models/lexparser/spanishPCFG.ser.gz"); 
		pipeline = new StanfordCoreNLP(props);
	}

	public String process(String text)
	{
		if(text.equals("\n")) return "\n";

		List<CoreLabel> rawWords = new ArrayList<CoreLabel>();

		Annotation document = new Annotation(text);

		// run all Annotators on this text
		pipeline.annotate(document);

		// these are all the sentences in this document
		// a CoreMap is essentially a Map that uses class objects as keys and has values with custom types
		List<CoreMap> sentences = document.get(SentencesAnnotation.class);

		for(CoreMap sentence: sentences) 
		{
			for (CoreLabel token: sentence.get(TokensAnnotation.class)) 
			{
				rawWords.add(token);
			}
		}

		Tree parse = lp.apply(rawWords); 
		//parse.pennPrint(); 

		return parse.equals("") ? "Failed to process this line" :  String.format("[Line %s [%s]]", ++lineNumb, parse.pennString());
	}

}