public class ReverseCommandLineArgs {
    public static void main(String[] args) {
        // Проверяем, есть ли аргументы командной строки
        if (args.length == 0) {
            System.out.println("Нет аргументов командной строки для отображения.");
            return;
        }

        // Выводим аргументы командной строки в обратном порядке
        System.out.println("Аргументы командной строки в обратном порядке:");
        for (int i = args.length - 1; i >= 0; i--) {
            System.out.println(args[i]);
        }
    }
}