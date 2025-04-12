class Volunteer {
    constructor({
        name = "",
        id = "",
        password = "",
        email = ""
    } = {}) {
        this.name = name;
        this.password = password;
        this.id = id;
        this.email = email;
    }

    static fromJSON(json) {
        return new Volunteer({
            name: json["name"],
            id: json["id"],
            email: json["email"]
        });
    }

    toJSON() {
        return {
            name: this.name,
            password: this.password,
            id: this.id,
            email: this.email
        };
    }
}

class Shelter extends Volunteer {
    constructor({
        name = "",
        id = "",
        password = "",
        email = "",
        address = "",
        shelter_category = "",
        bank_info = ""
    } = {}) {
        super({ name, id, password, email });
        this.address = address;
        this.shelter_category = shelter_category;
        this.bank_info = bank_info;
    }

    static fromJSON(json) {
        return new Shelter({
            name: json["name"],
            id: json["id"],
            email: json["email"],
            address: json["address"],
            shelter_category: json["shelter_category"],
            bank_info: json["bank_info"]
        });
    }

    toJSON() {
        return {
            ...super.toJSON(),
            address: this.address,
            shelter_category: this.shelter_category,
            bank_info: this.bank_info
        };
    }
}


export default {Volunteer, Shelter};
