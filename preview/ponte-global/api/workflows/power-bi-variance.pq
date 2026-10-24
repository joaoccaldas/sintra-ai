let
  Source = Csv.Document(Web.Contents("https://joaoccaldas.github.io/sintra-ai/api/workflows/power-bi-variance.csv"), [Delimiter=",", Encoding=65001, QuoteStyle=QuoteStyle.Csv]),
  Headers = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
  Typed = Table.TransformColumnTypes(Headers, {{"entity", type text}, {"fiscalPeriod", type text}, {"currency", type text}, {"product", type text}, {"scenario", type text}, {"quantity", Int64.Type}, {"unitPriceCents", Int64.Type}, {"amountCents", Int64.Type}})
in
  Typed
