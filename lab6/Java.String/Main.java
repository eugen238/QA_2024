import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        String text = "Это пример текст текст? В этом тексте есть несколько предложений. Некоторые из них содержат одинаковые слова 123. Например, слово 'текст' встречается дважды.";

        // 1
        System.out.println('1');
        int maxSentencesWithSameWords = getMaxSentencesWithSameWords(text);

        System.out.println("Наибольшее количество предложений с одинаковыми словами: " + maxSentencesWithSameWords);

        // 2
        System.out.println(' ');
        System.out.println('2');
        List<String> sortedSentences = sortSentencesByWordCount(text);

        System.out.println("Предложения в порядке возрастания количества слов:");
        for (String sentence : sortedSentences) {
            System.out.println(sentence);
        }

        // 3
        System.out.println(' ');
        System.out.println('3');
        String[] sentences = text.split("[.!?]\\s*"); // Разделение текста на предложения

        // Получаем слова из первого предложения
        String[] firstSentenceWords = sentences[0].split("\\s+");

        // Создаем множество для хранения слов из остальных предложений
        Set<String> otherSentencesWords = new HashSet<>();

        // Добавляем слова из остальных предложений в множество
        for (int i = 1; i < sentences.length; i++) {
            String[] words = sentences[i].split("\\s+");
            otherSentencesWords.addAll(Arrays.asList(words));
        }

        // Ищем слово из первого предложения, которого нет ни в одном из остальных
        // предложений
        String uniqueWord = null;
        for (String word : firstSentenceWords) {
            if (!otherSentencesWords.contains(word)) {
                uniqueWord = word;
                break;
            }
        }

        if (uniqueWord != null) {
            System.out.println(
                    "Слово из первого предложения, которого нет ни в одном из остальных предложений: " + uniqueWord);
        } else {
            System.out.println("Все слова из первого предложения встречаются в остальных предложениях.");
        }

        // 4
        System.out.println(' ');
        System.out.println('4');
        findWordsInInterrogativeSentences(text, 5);

        // 5. В каждом предложении текста поменять местами первое слово с последним, не
        // изменяя длины предложения.
        System.out.println(' ');
        System.out.println('5');
        String[] sentences2 = text.split("[.!?]\\s*"); // Разделение текста на предложения

        StringBuilder modifiedText = new StringBuilder();

        for (String sentence : sentences2) {
            String[] words = sentence.split("\\s+"); // Разделение предложения на слова

            if (words.length > 1) { // Убеждаемся, что предложение содержит более одного слова
                // Меняем местами первое и последнее слово
                String firstWord = words[0];
                words[0] = words[words.length - 1];
                words[words.length - 1] = firstWord;

                // Собираем предложение обратно из измененных слов
                StringBuilder modifiedSentence = new StringBuilder();
                for (String word : words) {
                    modifiedSentence.append(word).append(" ");
                }

                // Добавляем измененное предложение к тексту
                modifiedText.append(modifiedSentence.toString().trim()).append(". "); // Добавляем точку после
                                                                                      // предложения
            } else {
                // Если предложение состоит только из одного слова, оставляем его без изменений
                modifiedText.append(sentence).append(". "); // Добавляем точку после предложения
            }
        }

        System.out.println("Текст с измененными предложениями:");
        System.out.println(modifiedText.toString().trim()); // Удаляем последний пробел и точку перед выводом
    }

    // 1. Найти наибольшее количество предложений текста, в которых есть одинаковые
    // слова.
    public static int getMaxSentencesWithSameWords(String text) {
        String[] sentences = text.split("[.!?]\\s*"); // Разделение текста на предложения

        int maxCount = 0;
        for (String sentence : sentences) {
            String[] words = sentence.split("\\s+"); // Разделение предложения на слова
            Set<String> uniqueWords = new HashSet<>(Arrays.asList(words)); // Уникальные слова в предложении
            if (uniqueWords.size() < words.length) { // Если есть одинаковые слова
                maxCount++;
            }
        }

        return maxCount;
    }

    // 2. Вывести все предложения заданного текста в порядке возрастания количества
    // слов в каждом из них.
    public static List<String> sortSentencesByWordCount(String text) {
        // Разделение текста на предложения
        String[] sentences = text.split("[.!?]\\s*");

        // Создание списка предложений и их длин
        List<String> sentenceList = Arrays.asList(sentences);
        List<String> sortedSentences = new ArrayList<>(sentenceList);
        sortedSentences.sort(Comparator.comparingInt(Main::countWordsInSentence));

        return sortedSentences;
    }

    public static int countWordsInSentence(String sentence) {
        // Разделение предложения на слова и подсчет их количества
        String[] words = sentence.split("\\s+");
        return words.length;
    }

    // 4. Во всех вопросительных предложениях текста найти и напечатать без
    // повторений слова заданной длины.
    public static void findWordsInInterrogativeSentences(String text, int wordLength) {
        Pattern pattern = Pattern.compile("[^.!?]+\\?");
        Matcher matcher = pattern.matcher(text);

        Set<String> uniqueWords = new HashSet<>(); // Множество для хранения уникальных слов заданной длины

        while (matcher.find()) {
            String interrogativeSentence = matcher.group().trim();
            String[] words = interrogativeSentence.split("\\s+");
            for (String word : words) {
                if (word.length() == wordLength) {
                    uniqueWords.add(word.toLowerCase()); // Добавление слова в нижнем регистре в множество
                }
            }
        }

        if (!uniqueWords.isEmpty()) {
            System.out.println("Уникальные слова заданной длины в вопросительных предложениях:");
            for (String word : uniqueWords) {
                System.out.println(word);
            }
        } else {
            System.out.println("В вопросительных предложениях нет слов заданной длины.");
        }
    }
}
