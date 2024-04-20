import java.util.ArrayList;
import java.util.List;

class Group {
    public String name;
    private List<Student> students;

    public Group(String name) {
        this.name = name;
        this.students = new ArrayList<>();
    }

    public void addStudent(Student student) {
        students.add(student);
    }

    public double calculateAverageGradeBySubject(Subject subject) {
        if (students.isEmpty()) {
            throw new IllegalStateException("В группе нет студентов");
        }
        double sum = 0;
        int count = 0;
        for (Student student : students) {
            for (Subject s : student.getSubjects()) {
                if (s.equals(subject)) {
                    sum += student.calculateAverageGrade();
                    count++;
                }
            }
        }
        if (count == 0) {
            throw new IllegalStateException("В группе нет студентов по этому предмету");
        }
        return sum / count;
    }
}
