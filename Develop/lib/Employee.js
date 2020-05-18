// TODO: Write code to define and export the Employee class

class Employee {
    constructor (name, id, email) {
        this.name = name,
        this.id = id,
        this.email = email
    }

    getName() {
        console.log("whee")
    }

    getID() {
        console.log("whee1")
    }

    getEmail() {
        console.log("whee2")
    }

    getRole() {
        return "Employee"
    }

}

module.exports = Employee;