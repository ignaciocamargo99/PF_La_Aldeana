export const filterEmployeesByEmploymentDate = (employees, selectedMonth) => {
    // date selected format: YYYY-MM
    const yearSelected = selectedMonth.substring(0, 4);
    const monthSelected = selectedMonth.substring(5, 7);
    return employees.filter((emp) => {
        // employee admission date format: YYYY-MM-DD
        let employmentYear = emp.date.substring(0, 4);
        let employmentMonth = emp.date.substring(5, 7);

        // return (+yearSelected >= +employmentYear) && (+monthSelected >= +employmentMonth)
        if(+yearSelected > +employmentYear) return true;
        else if(+yearSelected === +employmentYear) return (+monthSelected >= +employmentMonth);
        return false;
    })
}
