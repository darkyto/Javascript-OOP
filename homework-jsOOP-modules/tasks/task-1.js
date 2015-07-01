/* 
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */
function solve() {
    /*jslint nomen: true */
    function validateResults(results) {
        var resultIDs = [],
            studentID,
            score;

        results.forEach(function (result) {

            studentID = result.StudentID;
            score = result.Score;
            resultIDs.push(studentID);

            if (resultIDs[studentID]) {
                throw new Error('Students IDs can not duplicate in the exam result list [pushEcamResults]');
            }
            if (isNaN(score)) {
                throw new Error('Invalid result score value at [pushExamResults]');
            }
            if (studentID <= 0 || studentID % 1 !== 0) {
                throw new Error('Invalid studentID score value at [pushExamResults]');
            }

        });
    }

    function validateTitle(title) {

        var re = /^\s|\s$|\s{2,}/;

        if (title.length < 1 || re.test(title)) {
            return false;
        }
        return true;
    }

    function validatePresentations(presentations) {
        if (presentations.length === 0 || presentations === undefined) {
            throw new Error('Invalid input at [presentations]');
        }
        presentations.forEach(function(title) {
            if (!validateTitle(title)) {
                throw new Error('Invalid input at [presentations[title]]');
            }
        });
    }

    function validateStudentsNames(name) {
        if (typeof name !== 'string' || name !== name.trim()) {
            return false;
        }
        var names = name.split(' ');
        if (names.length !== 2 || !(/^[A-Z]/.test(names[0])) || !(/^[A-Z]/.test(names[1]))) {
            return false;
        }
        return true;
    }
    var Course = {
        init: function (title, presentations) {

            if (!validateTitle(title)) {
                throw new Error('Invalid input at [title]');
            }
            validatePresentations(presentations);

            this.title = title;
            this.presentations = presentations;
            this.students = [];
            this.homeworks = [];
            this.studentID = 1;
            this.resultsList = [];

            return this;
        },
        addStudent: function (name) {

            if (!validateStudentsNames(name)) {
                throw new Error('invalid student name');
            }

            name = name.trim();
            var names = name.split(' ');
            var student = {
                firstname: names[0],
                lastname: names[1]
            };
            var counter = this.students.length + 1;

            student.id = counter;
            //student.id = this.studentID++;
            this.students.push(student);
            return student.id;
        },
        getAllStudents: function () {
            return this.students.slice();
        },
        submitHomework: function (studentID, homeworkID) {
            if (studentID >= this.students.length + 1 || studentID <= 0) {
                throw new Error('Invalid StudentID');
            }
            if (homeworkID > this.presentations.length || homeworkID <= 0) {
                throw new Error('Invalid HomeworkID');
            }
            this._homework = {
                student: studentID,
                homework: homeworkID
            };
            //this.homeworks[studentID] = homeworkID;
        },
        pushExamResults: function (results) {
            var len = this._students.length;
            // results = [{stID:x, score:z},{},{},...];  
            results.forEach(function(result) {
                if (result.StudentID > len) {
                    throw new Error('Invalid studentID');
                }
            });
            validateResults(results);

            this._results = results.map(function(result) {
                return (result.StudentID > 0 && result.StudentID <= len) ? {
                    studentID: result.StudentID,
                    score: result.Score
                } : {
                    studentID: result.StudentID,
                    score: 0
                };
            });
        },
        getTopStudents: function() {
            var topPerformers = [];
            var tempArr = this._results.slice();
            tempArr = tempArr.sort(function(a, b) {
                return b.score - a.score;
            });

            var len = this._results.length;
            if (len > 10) {
                topPerformers = tempArr.slice(0, 9);
            } else {
                topPerformers = tempArr.slice();
            }
            return topPerformers;
        }
    };
    Object.defineProperty(Course, 'title', {
        get: function () {
            return this._title;
        },
        set: function(value) {
            this._title = value;
        }
    });
    Object.defineProperty(Course, 'presentations', {
        get: function () {
            return this._presentations;
        },
        set: function (value) {
            this._presentations = this._presentations || [];
            this._presentations = value;
        }
    });
    Object.defineProperty(Course, 'students', {
        get: function () {
            return this._students;
        },
        set: function (value) {
            this._students = value;
        }
    });
    Object.defineProperty(Course, 'homeworks', {
        get: function () {
            return this._homeworks;
        },
        set: function (value) {
            var st = value.student;
            var hw = value.homework;
            this._homeworks = this._homeworks || [];
            this._homeworks[st] = hw;
        }
    });
    Object.defineProperty(Course, 'results', {
        get: function () {
            return this._resultsList;
        },
        set: function (result) {
            var stID = result.StudentID;
            var score = result.Score;
            this._resultsList = this._resultsList || [];
            this._resultsList[stID] = score;
        }
    });
    return Course;
}


module.exports = solve;