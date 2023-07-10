import { databases } from "@/appwrite"

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
  )

  const todos = data.documents;
  
  const columns = todos.reduce((acc, todo) => {
    if(!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: []
      })
    }

    //Transfor data to a Map function for a better readable way
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) })
    });

    return acc;

  }, new Map<TypedColumn, Column>());
  
// if the column doesnt have an inprogress, todo or data in done column, add them with empty todos
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // sort columns by columnTypes
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(    //get all the key value in an array format
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    ) 
  );

  const board: Board = {
    columns: sortedColumns 
  }

  return board; 
};