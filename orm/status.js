class Status{
    constructor(ready, pending, completed,failed){
        this.ready = ready;
        this.pending = pending;
        this.completed = completed;
        this.failed = failed;
    }
}

module.exports = Status;