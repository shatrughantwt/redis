import {Worker} from 'bullmq';
import {connection} from './queue.js';

const worker = new Worker(
    "emails",
    async (Job) => {    
    console.log("Processing email job..", Job.id, Job.name, Job.data);
    (await new Promise((resolve) => setTimeout(resolve, 1000)));    
    console.log("Email job completed..", Job.id, Job.name, Job.data);   
},
   {connection }
);

worker.on("completed", (job) => {
    console.log(`Job ${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
    console.log(`Job ${job.id} has failed with ${err.message}`);
}); 