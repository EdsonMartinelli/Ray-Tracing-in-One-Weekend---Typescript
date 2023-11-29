import { Color } from "../utils/Color";

export interface ICreateVoidImage {
  color: string;
  width: number;
  height: number;
  name: string;
}

export interface ICreateBufferImage {
  pixels: Color[];
  width: number;
  height: number;
  name: string;
  samplePerPixel?: number;
}

export interface IImageLibrary {
  createVoidImage: ({ color, width, height, name }: ICreateVoidImage) => void;

  /*
    Caso necessário, faça a consistência de cores nessa função, não permitindo 
    números negativos e mantendo-os entre 0 e 255 como inteiros. Consulte as notas
    em caso de dúvida.
    */
  createBufferImage: ({
    pixels,
    width,
    height,
    name,
    samplePerPixel,
  }: ICreateBufferImage) => void;
}
