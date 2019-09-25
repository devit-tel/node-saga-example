const { Worker } = require("node-saga-client");

const config = require("./config.json");

// const taskDefs = [
//   {
//     name: "task-1",
//     description: "description",
//     ackTimeout: 0,
//     timeout: 0,
//     retry: {
//       limit: 0,
//       delay: 0
//     },
//     document: {
//       inputs: [
//         {
//           field: "name",
//           type: "string",
//           description: "name of user",
//           required: true
//         },
//         {
//           field: "citizenId",
//           type: "string",
//           description: "citizen ID of user",
//           required: true
//         }
//       ],
//       output: [
//         {
//           field: "user",
//           type: "any",
//           description: "user infomation data",
//           required: true
//         }
//       ]
//     }
//   },
//   {
//     name: "task-2",
//     description: "description",
//     ackTimeout: 0,
//     timeout: 0,
//     retry: {
//       limit: 0,
//       delay: 0
//     },
//     document: {
//       inputs: [
//         {
//           field: "name",
//           type: "string",
//           description: "name of user",
//           required: true
//         },
//         {
//           field: "citizenId",
//           type: "string",
//           description: "citizen ID of user",
//           required: true
//         }
//       ],
//       output: [
//         {
//           field: "user",
//           type: "any",
//           description: "user infomation data",
//           required: true
//         }
//       ]
//     }
//   },
//   {
//     name: "task-3",
//     description: "description",
//     ackTimeout: 0,
//     timeout: 0,
//     retry: {
//       limit: 0,
//       delay: 0
//     },
//     document: {
//       inputs: [
//         {
//           field: "name",
//           type: "string",
//           description: "name of user",
//           required: true
//         },
//         {
//           field: "citizenId",
//           type: "string",
//           description: "citizen ID of user",
//           required: true
//         }
//       ],
//       output: [
//         {
//           field: "user",
//           type: "any",
//           description: "user infomation data",
//           required: true
//         }
//       ]
//     }
//   }
// ];

// const workflowDef = {
//   name: "test",
//   rev: "test-output-5",
//   description: "No description",
//   tasks: [
//     {
//       name: "task-1",
//       taskReferenceName: "task-1",
//       type: "TASK",
//       inputParameters: {
//         userId: "${workflow.input.user._id}"
//       }
//     },
//     {
//       name: "task-2",
//       taskReferenceName: "task-2",
//       type: "TASK",
//       inputParameters: {
//         userId: "${workflow.input.user._id}"
//       }
//     },
//     {
//       name: "task-3",
//       taskReferenceName: "task-3",
//       type: "TASK",
//       inputParameters: {
//         userId: "${workflow.input.user._id}"
//       }
//     }
//   ],
//   failureStrategy: "COMPENSATE",
//   outputParameters: {
//     transactionId: "${workflow.transactionId}",
//     "task-1-input": "${task-1.input}",
//     "task-2-output-hello": "${task-2.output.hello}",
//     "when-task-2-completed": "${task-2.endTime}"
//   }
// };

for (let i = 1; i <= 3; i++) {
  new Worker(
    `task-${i}`,
    task => {
      console.log(`Processing ${task.taskReferenceName}`);
      return {
        status: "COMPLETED",
      };
    },
    task => {
      console.log(`Compensating ${task.taskReferenceName}`);
      return {
        status: "COMPLETED"
      };
    },
    config.sagaConfig
  ).consumer.on("ready", () => console.log(`Worker ${i} is ready!`));
}

// Expect result
// Processing task-1
// Processing parallel-1-task-1
// Processing parallel-1-task-2
// Processing parallel-1-parallel-2-1-task-1
// Processing parallel-1-parallel-2-2-task-1
// Processing parallel-1-parallel-2-1-task-2
// Processing parallel-1-parallel-2-2-task-2
// Processing task-2

// => Transaction status = COMPLETED
