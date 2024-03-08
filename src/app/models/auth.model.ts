import exp from "constants";

export interface IUser{
    id: number;
    name: string;
    email: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse{
    message: string;
    token: string;
    user: IUser;
}

export interface IRegister{
    email: string;
    firstName: string;
    secondName: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
}

export interface IRegisterResponse{
    id: number;
    firstName: string,
    secondName: string,
    phoneNumber: string,
    email: string
}

export interface IAttributeName{
    name:string;
    unitId:number;
}

export interface IAttributeName1 {
    id: number;
    name: string;
    unit?: {
      id: number;
      name: string;
    };
  }

export interface IAttributeNameResponse{
    id:number;
    name:string;
    unit:string;
}

export interface ISaveUnitResponse{
    id:number
    name:string
}

export interface IUnit{
    name:string
}

export interface Article {
    code: string;
    name: string;
    type: string;
    unit: string;
    attributes: Attribute[];
  }

  export interface Article1 {
    code: string;
    name: string;
    type: Type;
    unit: Unit;
    attributes: Attribute[];
  }

  export interface Type{
    id: number;
    name: string;
  }

  export interface Unit{
    id: number;
    name: string;
  }
  
  export interface Attribute {
    name: string;
    value: any;
  }

  export interface IArticleAdd {
    name: string;
    code: string;
    unitId: number;
    typeId: number;
    attributes: IAttributeAddArticle[];
  }
  
  export interface IAttributeAddArticle {
    attributeNameId: number;
    value: string;
    productId: number;
  }

  export interface IArticleAddResponse{

  }

  export interface ISaveTypeResponse{
    id:number
    name:string
}

export interface IType{
    name:string
}