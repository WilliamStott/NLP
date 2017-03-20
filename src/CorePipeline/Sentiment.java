package CorePipeline;

import java.util.Properties;


import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.neural.rnn.RNNCoreAnnotations;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.trees.Tree;
import edu.stanford.nlp.util.CoreMap;

public class Sentiment {

	private Properties props = new Properties();
	private StanfordCoreNLP pipeline;
	private int lineNumb = 0;
	
	public Sentiment()
	{
		props.setProperty("annotators", "tokenize, ssplit, parse, sentiment");
		pipeline = new StanfordCoreNLP(props);
	}
	
	public String process(String text)
	{
        int mainSentiment = 0;
        if (text != null && text.length() > 0) 
        {
            int longest = 0;
            Annotation annotation = pipeline.process(text);
            for (CoreMap sentence : annotation.get(CoreAnnotations.SentencesAnnotation.class)) 
            {
                Tree tree = sentence.get(SentimentCoreAnnotations.SentimentAnnotatedTree.class);
                int sentiment = RNNCoreAnnotations.getPredictedClass(tree);
                String partText = sentence.toString();
                if (partText.length() > longest) 
                {
                    mainSentiment = sentiment;
                    longest = partText.length();
                }
 
            }
        }
        return String.format("[Line %s has a sentiment value of %s]", ++lineNumb, String.valueOf(mainSentiment));
	}
}
