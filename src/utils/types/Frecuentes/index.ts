export type Periodo = "Semanal" | "Quincenal" | "Diaria";
export type FreqColors = "Light" | "Medium" | "Hard";

export type LAPSES = "diario" | "semanal" | "quincenal";

export type PostGastoFrecuenteParams = {
  name: string;
  amount: number;
  lapse: Periodo;
  description?: string;
};

export type FrecuenteRow = {
  freId: number;
  freName: string;
  freDescription: string;
  freColor: FreqColors;
  freAmount: number;
  freLapse: Periodo;
  dayId: number;
  usuId: number;
};

export type PostGastoFrecuenteResponse = {
  message: "Gasto creado";
  gasto: FrecuenteRow;
};

export type GetGastosFrecuentesResponse = {
  message: "Gastos obtenidos";
  frecuentes: FrecuenteRow[];
};
