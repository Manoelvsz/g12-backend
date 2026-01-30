// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// 🔥 FORÇA o carregamento do .env da raiz do projeto
config({ path: resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'admin', label: 'Administrador', hierarchy: 6, description: 'Acesso completo' },
    { name: 'supervisor', label: 'Supervisor', hierarchy: 5, description: 'Supervisiona células' },
    { name: 'pastor', label: 'Pastor', hierarchy: 4, description: 'Gerencia células' },
    { name: 'lider', label: 'Líder de Célula', hierarchy: 3, description: 'Lidera célula' },
    { name: 'membro', label: 'Membro', hierarchy: 2, description: 'Participa de célula' },
    { name: 'visitante', label: 'Visitante', hierarchy: 1, description: 'Acesso limitado' },
  ];

  console.log('🌱 Iniciando seed dos roles...');

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
    console.log(`✅ Role "${role.label}" criada/atualizada`);
  }

  // Seed de Bairros
  console.log('\n🌱 Iniciando seed de bairros...');

  const neighborhoods = [
    'Acupe',
    'Aeroporto',
    'Águas Claras',
    'Alto da Terezinha',
    'Alto das Pombas',
    'Alto do Cabrito',
    'Alto do Coqueirinho',
    'Amaralina',
    'Areia Branca',
    'Arenoso',
    'Arraial do Retiro',
    'Bairro da Paz',
    'Baixa de Quintas',
    'Barbalho',
    'Barra',
    'Barreiras',
    'Barris',
    'Beiru/Tancredo Neves',
    'Boa Viagem',
    'Boa Vista de Brotas',
    'Boa Vista de São Caetano',
    'Boca da Mata',
    'Boca do Rio',
    'Bom Juá',
    'Bonfim',
    'Brotas',
    'Cabula',
    'Cabula VI',
    'Caixa D´Água',
    'Cajazeiras II',
    'Cajazeiras IV',
    'Cajazeiras V',
    'Cajazeiras VI',
    'Cajazeiras VII',
    'Cajazeiras VIII',
    'Cajazeiras X',
    'Cajazeiras XI',
    'Calabar',
    'Calabetão',
    'Calçada',
    'Caminho das Árvores',
    'Caminho de Areia',
    'Campinas de Pirajá',
    'Canabrava',
    'Candeal',
    'Canela',
    'Capelinha',
    'Cassange',
    'Castelo Branco',
    'Centro',
    'Centro Administrativo da Bahia-CAB',
    'Centro Histórico',
    'Chame-Chame',
    'Chapada do Rio Vermelho',
    'Cidade Nova',
    'Colinas de Periperi',
    'Comércio',
    'Cosme de Farias',
    'Costa Azul',
    'Coutos',
    'Curuzu',
    'Dois de Julho',
    'Dom Avelar',
    'Doron',
    'Engenho Velho da Federação',
    'Engenho Velho de Brotas',
    'Engomadeira',
    'Fazenda Coutos',
    'Fazenda Grande do Retiro',
    'Fazenda Grande I',
    'Fazenda Grande II',
    'Fazenda Grande III',
    'Fazenda Grande IV',
    'Federação',
    'Garcia',
    'Graça',
    'Granjas Rurais Presidente Vargas',
    'Horto Florestal',
    'IAPI',
    'Ilha Amarela',
    'Ilha de Bom Jesus dos Passos',
    'Ilha dos Frades/Ilha de Santo Antônio',
    'Ilha de Maré',
    'Imbuí',
    'Itacaranha',
    'Itaigara',
    'Itapuã',
    'Itinga',
    'Jaguaripe I',
    'Jardim Armação',
    'Jardim Cajazeiras',
    'Jardim das Margaridas',
    'Jardim Nova Esperança',
    'Jardim Santo Inácio',
    'Lapinha',
    'Liberdade',
    'Lobato',
    'Luiz Anselmo',
    'Macaúbas',
    'Mangueira',
    'Marechal Rondon',
    'Mares',
    'Massaranduba',
    'Mata Escura',
    'Matatu',
    'Mirantes de Periperi',
    'Monte Serrat',
    'Moradas da Lagoa',
    'Mussurunga',
    'Narandiba',
    'Nazaré',
    'Nordeste de Amaralina',
    'Nova Brasília',
    'Nova Constituinte',
    'Nova Esperança',
    'Nova Sussuarana',
    'Novo Horizonte',
    'Novo Marotinho',
    'Ondina',
    'Palestina',
    'Paripe',
    'Patamares',
    'Pau da Lima',
    'Pau Miúdo',
    'Periperi',
    'Pernambués',
    'Pero Vaz',
    'Piatã',
    'Pirajá',
    'Pituaçu',
    'Pituba',
    'Plataforma',
    'Porto Seco Pirajá',
    'Praia Grande',
    'Resgate',
    'Retiro',
    'Ribeira',
    'Rio Sena',
    'Rio Vermelho',
    'Roma',
    'Saboeiro',
    'Santa Cruz',
    'Santa Luzia',
    'Santa Mônica',
    'Santo Agostinho',
    'Santo Antônio',
    'São Caetano',
    'São Cristóvão',
    'São Gonçalo',
    'São João do Cabrito',
    'São Marcos',
    'São Rafael',
    'São Tomé',
    'Saramandaia',
    'Saúde',
    'Sete de Abril',
    'Stella Maris',
    'STIEP',
    'Sussuarana',
    'Tororó',
    'Trobogy',
    'Uruguai',
    'Vale das Pedrinhas',
    'Vale dos Lagos',
    'Valéria',
    'Vila Canária',
    'Vila Laura',
    'Vila Ruy Barbosa/Jardim Cruzeiro',
    'Vitória',
    'Vista Alegre',
  ];

  await prisma.neighborhoods.createMany({
    data: neighborhoods.map((name) => ({ name, city: 'Salvador', state: 'BA' })),
    skipDuplicates: true,
  });
  console.log(`✅ ${neighborhoods.length} bairros inseridos/atualizados`);

  // ✅ Seed de Posts Institucionais
  console.log('\n🌱 Iniciando seed dos posts...');

  const posts = [
    {
      title: '🙏 Culto de Celebração - Domingo',
      content:
        'Neste domingo teremos culto especial de encerramento do ano. Venha celebrar conosco a graça de Deus durante este ano que se encerra. Prepare-se espiritualmente para uma manhã abençoada com louvor, ensinamento e comunhão.',
      imageUrl: 'https://via.placeholder.com/800x400?text=Culto+Celebração',
      published: true,
    },
    {
      title: '📚 Estudo Bíblico - G12',
      content:
        'Iniciamos este mês um novo ciclo de estudo bíblico focado na estrutura G12. Venha conhecer melhor como funcionam as células e como você pode se integrar em um grupo pequeno para crescimento espiritual em comunidade.',
      imageUrl: null,
      published: true,
    },
    {
      title: '🎓 Universidade Crista Começa Em Breve',
      content:
        'A Universidade Crista PIB Brasil está com inscrições abertas para os próximos módulos. Cursos sobre liderança, fundamentos da fé, missões e muito mais. Invista em seu conhecimento espiritual e prepare-se para servir melhor na obra de Deus.',
      imageUrl: 'https://via.placeholder.com/800x400?text=Universidade+Crista',
      published: true,
    },
    {
      title: '🤝 Conectando-se - Mapa de Células',
      content:
        'Conheça as células da sua região através do nosso mapa interativo. Encontre um grupo perto de você e comece a fazer parte de uma comunidade que cresce em Cristo. Cada célula é um espaço seguro para relacionamentos genuínos e crescimento espiritual.',
      imageUrl: null,
      published: true,
    },
    {
      title: '✨ Eventos Especiais Este Mês',
      content:
        'Confira a programação completa de eventos de dezembro. Temos dias de oração, encontros de liderança, celebrações familiares e muito mais. Não perca a oportunidade de estar com a comunidade de fé durante este período tão especial.',
      imageUrl: 'https://via.placeholder.com/800x400?text=Eventos+Especiais',
      published: true,
    },
  ];

  // Limpar posts antigos antes de inserir novos
  await prisma.post.deleteMany({});
  console.log('🗑️ Posts antigos deletados');

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
    console.log(`✅ Post "${post.title}" criado com sucesso`);
  }

  console.log('\n✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
