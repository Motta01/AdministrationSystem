export class HoneyReport {
    constructor(
        public local_host: String,
        public protocol: String,
        public session: String,
        public date: String,
        public data: String,
        public event: String,
        public millisecond: String,
        public date_time: String,
        public data_hash: String,
        public service: String,
        public local_port: String,
        public remote_port: String,
        public bytes: String,
        public time: String,
        public remote_host: String
    ) { }
}