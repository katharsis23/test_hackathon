class Comments{
    constructor({
        comment_id="",
        description="",
        shelter_id="",
        volunteer_id=""
    }={}){
        this.comment_id=comment_id,
        this.description=description,
        this.shelter_id=shelter_id,
        this.volunteer_id=volunteer_id
    }

    static fromJSON(json){
        return new Comments({
            comment_id: json["comment_id"],
            description: json["description"],
            volunteer_id: json["volunteer_id"],
            shelter_id: json["shelter_id"]
        });
    }


    toJSON(){
        return {
            "comment_id": this.comment_id,
            "description": this.description,
            "volunteer_id": this.volunteer_id,
            "shelter_id": this.shelter_id
        }
    }
}