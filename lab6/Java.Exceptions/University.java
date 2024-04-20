import java.util.ArrayList;
import java.util.List;

class University {
    private List<Faculty> faculties;

    public University() {
        this.faculties = new ArrayList<>();
    }

    public void addFaculty(Faculty faculty) {
        faculties.add(faculty);
    }

    public double calculateAverageGradeBySubject(Subject subject) {
        if (faculties.isEmpty()) {
            throw new IllegalStateException("В университете нет факультетов");
        }
        double sum = 0;
        int count = 0;
        for (Faculty faculty : faculties) {
            try {
                sum += faculty.calculateAverageGradeBySubject(subject);
                count++;
            } catch (IllegalStateException e) {

            }
        }
        if (count == 0) {
            throw new IllegalStateException("В университете нет групп по этому предмету");
        }
        return sum / count;
    }
}
