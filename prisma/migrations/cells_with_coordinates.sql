-- ============================================================================
-- INSERIR CÉLULAS COM COORDENADAS
-- ============================================================================
-- Este script adiciona células de exemplo com coordenadas GPS
-- Coordenadas de Salvador, BA (latitude entre -12.9 e -13.0, longitude entre -38.5 e -38.6)

-- Primeiro, obter os IDs dos bairros (exemplo com alguns bairros principais)
-- Você pode adicionar mais células conforme necessário

INSERT INTO cells (name, neighborhood_id, address, latitude, longitude)
SELECT 
  'Célula do Bairro ' || neighborhoods.name,
  neighborhoods.id,
  'Rua Principal, ' || neighborhoods.name || ', Salvador - BA',
  -- Gerar coordenadas aproximadas para Salvador (variando com base no nome do bairro)
  CASE 
    WHEN neighborhoods.name = 'Barra' THEN -12.9681
    WHEN neighborhoods.name = 'Pituba' THEN -12.9833
    WHEN neighborhoods.name = 'Rio Vermelho' THEN -12.9758
    WHEN neighborhoods.name = 'Campo Grande' THEN -12.9564
    WHEN neighborhoods.name = 'Canela' THEN -12.9658
    WHEN neighborhoods.name = 'Graça' THEN -12.9597
    WHEN neighborhoods.name = 'Vitória' THEN -12.9746
    WHEN neighborhoods.name = 'Bom Viagem' THEN -12.8903
    WHEN neighborhoods.name = 'Armação' THEN -12.8847
    WHEN neighborhoods.name = 'Stella Maris' THEN -12.8458
    ELSE -12.9714 -- coordenada padrão (centro de Salvador)
  END as latitude,
  CASE 
    WHEN neighborhoods.name = 'Barra' THEN -38.5436
    WHEN neighborhoods.name = 'Pituba' THEN -38.5167
    WHEN neighborhoods.name = 'Rio Vermelho' THEN -38.5369
    WHEN neighborhoods.name = 'Campo Grande' THEN -38.5042
    WHEN neighborhoods.name = 'Canela' THEN -38.5214
    WHEN neighborhoods.name = 'Graça' THEN -38.5089
    WHEN neighborhoods.name = 'Vitória' THEN -38.5136
    WHEN neighborhoods.name = 'Bom Viagem' THEN -38.3786
    WHEN neighborhoods.name = 'Armação' THEN -38.3769
    WHEN neighborhoods.name = 'Stella Maris' THEN -38.3292
    ELSE -38.5104 -- coordenada padrão (centro de Salvador)
  END as longitude
FROM neighborhoods
WHERE neighborhoods.name IN (
  'Barra', 'Pituba', 'Rio Vermelho', 'Campo Grande', 'Canela',
  'Graça', 'Vitória', 'Bom Viagem', 'Armação', 'Stella Maris'
)
ON CONFLICT (name, neighborhood_id) DO NOTHING;

-- ============================================================================
-- RESULTADO
-- ============================================================================
-- Este script insere 10 células de exemplo em bairros principais de Salvador
-- Cada célula tem:
-- - Nome: "Célula do Bairro [Nome]"
-- - Endereço: "Rua Principal, [Bairro], Salvador - BA"
-- - Coordenadas GPS para localização no mapa
--
-- Você pode executar este script várias vezes sem duplicar dados (ON CONFLICT DO NOTHING)
--
-- Para adicionar mais células:
-- 1. Crie mais CASE WHEN com novos bairros
-- 2. Adicione o nome do bairro na lista WHERE IN (...)
-- 3. Execute novamente
--
-- Coordenadas de Salvador:
-- - Centro: -12.9714° S, -38.5104° W
-- - Latitude varia de -12.8 a -13.0 (sul)
-- - Longitude varia de -38.3 a -38.6 (oeste)
