export default class User{
    constructor (id, username, password, role, name){
        this.id = id;
        this.username = username;
        this.name = name; //maybe add a name field for reigster
        this.password = password;
        this.role = role;
    }
}