
  export interface locationDetails {
    aisle: string;
    shelf: string;
    rack: string;
  }
  
  export interface Inventory {
    inventoryId: string;
    item:string,
    sku: string;
    quantity: number;
    locationDetails: locationDetails;
    batch:number;
    
  }
  