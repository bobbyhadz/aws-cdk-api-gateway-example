import * as apigateway from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'api', {
      description: 'example api gateway',
      deployOptions: {
        stageName: 'dev',
      },
      // 👇 enable CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['http://localhost:3000'],
      },
    });

    // 👇 define get todos function
    const getTodosLambda = new lambda.Function(this, 'get-todos-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/get-todos')),
    });
    // 👇 add a resource with a GET method
    const todos = api.root.addResource('todos');
    todos.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getTodosLambda, {proxy: true}),
    );

    const deleteTodoLambda = new lambda.Function(this, 'delete-todo-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/delete-todo')),
    });
    // 👇 add a resource at /todos/{todoId} with a DELETE method
    const todo = todos.addResource('{todoId}');
    todo.addMethod(
      'DELETE',
      new apigateway.LambdaIntegration(deleteTodoLambda, {proxy: true}),
    );

    // 👇 create an Output for the API URL
    new cdk.CfnOutput(this, 'apiUrl', {value: api.url});
  }
}
