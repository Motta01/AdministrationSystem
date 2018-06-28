export class GerentialReport {
    constructor(
        public honey_name: String,
        public owner: String,
        public session: String,
        public date: String,
        public service: String,
        public local_host: String,
        public local_port: String,
        public remote_port: String,
        public remote_host: String,
        public dangerous_level: String,
        public description: String
    ) { }
}