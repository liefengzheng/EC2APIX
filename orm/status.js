class Status{
    constructor(start, pending, completed,failed){
        this.start = start;
        this.pending = pending;
        this.completed = completed;
        this.failed = failed;
    }
}

module.exports = Status;