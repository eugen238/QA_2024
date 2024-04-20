import java.util.ArrayList;
import java.util.List;

class Subject {
    public String name;
    private List<Integer> grades;

    public Subject(String name) {
        this.name = name;
        this.grades = new ArrayList<>();
    }

    public void addGrade(int grade) {
        if (grade < 0 || grade > 10) {
            throw new IllegalArgumentException("Оценка должна быть от 0 до 10");
        }
        grades.add(grade);
    }

    public double calculateAverageGrade() {
        if (grades.isEmpty()) {
            throw new IllegalStateException("Студент не имеет оценок по этому предмету");
        }
        int sum = 0;
        for (int grade : grades) {
            sum += grade;
        }
        return (double) sum / grades.size();
    }
}