// tempData.ts
import images from "./images";

export const shipments = [
    {
      id: '1',
      status: 'RECEIVED',
      awb: '41785691423',
      origin: 'Cairo',
      originDetails:"Smoha, 22 max St.",
      destination: 'Alexandria',
      destinationDetails: "Dokki, 22 Nile St.",
      icon: images.BoxIcon, 

    },
    {
      id: '2',
      status: 'CANCELED',
      awb: '41785691424',
      origin: 'Cairo',
      originDetails:"Smoha, 22 max St.",
      destination: 'Alexandria',
      destinationDetails: "Dokki, 22 Nile St.",
      icon: images.BoxIcon,

    },
    {
      id: '3',
      status: 'ON HOLD',
      awb: '41785691425',
      origin: 'Cairo',
      originDetails:"Smoha, 22 max St.",
      destination: 'Alexandria',
      destinationDetails: "Dokki, 22 Nile St.",
      icon: images.BoxIcon,

    },
  ];
  