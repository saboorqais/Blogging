export interface ID {
  id?: number;
}

export interface UserSchema extends ID {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:string
}

export interface CategoriesSchema extends ID {
  description: string;
  categoryName: string;
  imagePath: string;
}

export interface PostSchema {
  id:number,
  title: string;
  body: string;
  name: string;
  topic: string;
  userId: number;
  categoryId: number;
  imagePath: string;
}

export interface SearchSchema extends PostSchema {
  username:string
}

export interface CommentSchema extends ID {
  text: string;
  userId: number;
  parentId: number;
  postId: number;
  replies?:CommentSchema[]
}
