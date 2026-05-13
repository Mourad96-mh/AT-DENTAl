require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Product = require('../models/Product')

const newProducts = [
  // ── RESTAURATION — Composites ─────────────────────────────────
  {
    name: { fr: 'Palfique LX5', en: 'Palfique LX5' },
    brand: 'Tokuyama', category: 'restauration', price: 320,
    description: { fr: 'Composite nano-hybride Palfique LX5 Tokuyama, opacité naturelle et polissabilité exceptionnelle pour restaurations antérieures et postérieures.', en: 'Palfique LX5 Tokuyama nano-hybrid composite, natural opacity and exceptional polishability for anterior and posterior restorations.' },
  },
  {
    name: { fr: 'P60', en: 'P60' },
    brand: '3M', category: 'restauration', price: 300,
    description: { fr: 'Composite packable P60 3M ESPE, haute résistance à la compression, idéal pour les restaurations postérieures de classes I et II.', en: '3M ESPE P60 packable composite, high compressive strength, ideal for class I and II posterior restorations.' },
  },
  {
    name: { fr: 'Solar X', en: 'Solar X' },
    brand: 'GC', category: 'restauration', price: 280,
    description: { fr: 'Composite universel Solar X GC, teintes précises et stabilité colorimetrique, résistance mécanique élevée.', en: 'GC Solar X universal composite, precise shades and color stability, high mechanical strength.' },
  },
  {
    name: { fr: 'TE-Économe Composite', en: 'TE-Économe Composite' },
    brand: 'Ivoclar', category: 'restauration', price: 250,
    description: { fr: 'Composite économique TE-Économe Ivoclar, facile à modeler, bonne adaptation marginale pour restaurations de routine.', en: 'TE-Économe Ivoclar economical composite, easy to shape, good marginal adaptation for routine restorations.' },
  },
  {
    name: { fr: 'Denfil', en: 'Denfil' },
    brand: 'Denfil', category: 'restauration', price: 220,
    description: { fr: 'Composite universel Denfil micro-hybride, polissage aisé et stabilité des teintes pour restaurations directes.', en: 'Denfil micro-hybrid universal composite, easy polishing and shade stability for direct restorations.' },
  },
  {
    name: { fr: 'Megafil', en: 'Megafil' },
    brand: 'Sans Marque', category: 'restauration', price: 220,
    description: { fr: 'Composite condensable Megafil haute viscosité, manipulation simplifiée et résistance aux contraintes occlusales.', en: 'Megafil high-viscosity condensable composite, simplified handling and resistance to occlusal stress.' },
  },
  {
    name: { fr: 'IPS Empress', en: 'IPS Empress' },
    brand: 'Ivoclar', category: 'restauration', price: 450,
    description: { fr: 'Système céramique pressée IPS Empress Ivoclar Vivadent, esthétique optimale et résistance mécanique pour facettes, inlays et couronnes antérieures.', en: 'IPS Empress Ivoclar Vivadent pressed ceramic system, optimal aesthetics and mechanical strength for veneers, inlays and anterior crowns.' },
  },
  {
    name: { fr: 'Tetric Bulk Fill', en: 'Tetric Bulk Fill' },
    brand: 'Ivoclar', category: 'restauration', price: 280,
    description: { fr: 'Composite Bulk Fill Tetric Ivoclar, technique monocouche jusqu\'à 4mm, photopolymérisation rapide et fiable.', en: 'Tetric Ivoclar Bulk Fill composite, single layer technique up to 4mm, fast and reliable light-curing.' },
  },
  {
    name: { fr: 'Z350', en: 'Z350' },
    brand: '3M', category: 'restauration', price: 320,
    description: { fr: 'Composite universel Filtek Z350 3M, nanocharges sphériques, polissage brillant durable pour restaurations esthétiques.', en: '3M Filtek Z350 universal composite, spherical nanofillers, durable gloss polish for aesthetic restorations.' },
  },
  {
    name: { fr: 'Z350 Flow', en: 'Z350 Flow' },
    brand: '3M', category: 'restauration', price: 280,
    description: { fr: 'Composite fluide Filtek Z350 Flow 3M, nanocharges, idéal pour les couches de liner et restaurations de classe V.', en: '3M Filtek Z350 Flow composite, nanofillers, ideal for liner layers and class V restorations.' },
  },
  {
    name: { fr: 'Gradia Flow', en: 'Gradia Flow' },
    brand: 'GC', category: 'restauration', price: 280,
    description: { fr: 'Composite fluide Gradia Flow GC, microhybride, fluidité optimale pour obturation des sillons et couches de base.', en: 'GC Gradia Flow composite, microhybrid, optimal fluidity for pit and fissure sealing and base layers.' },
  },
  {
    name: { fr: 'Tetric N Flow', en: 'Tetric N Flow' },
    brand: 'Ivoclar', category: 'restauration', price: 250,
    description: { fr: 'Composite fluide Tetric N-Flow Ivoclar, faible module d\'élasticité pour absorption des contraintes de contraction.', en: 'Tetric N-Flow Ivoclar flowable composite, low modulus of elasticity to absorb contraction stresses.' },
  },
  {
    name: { fr: 'Flow D Line', en: 'Flow D Line' },
    brand: 'D Line', category: 'restauration', price: 180,
    description: { fr: 'Composite fluide D Line, fluidité contrôlée et bonne adaptation aux parois cavitaires, usage économique.', en: 'D Line flowable composite, controlled fluidity and good cavity wall adaptation, economical use.' },
  },
  {
    name: { fr: 'I-Flow', en: 'I-Flow' },
    brand: 'I Dental', category: 'restauration', price: 180,
    description: { fr: 'Composite fluide I-Flow I Dental, polissabilité et teintes naturelles pour restaurations postérieures et liner.', en: 'I Dental I-Flow flowable composite, polishability and natural shades for posterior restorations and liner.' },
  },
  {
    name: { fr: 'Compoflow', en: 'Compoflow' },
    brand: 'Sans Marque', category: 'restauration', price: 200,
    description: { fr: 'Composite fluide Compoflow universel, viscosité optimale pour couches de base et restaurations classe III et V.', en: 'Compoflow universal flowable composite, optimal viscosity for base layers and class III and V restorations.' },
  },
  {
    name: { fr: 'Compomax', en: 'Compomax' },
    brand: 'D Tech', category: 'restauration', price: 200,
    description: { fr: 'Composite universel Compomax D Tech, formule hybride équilibrée pour restaurations directes antérieures et postérieures.', en: 'Compomax D Tech universal composite, balanced hybrid formula for direct anterior and posterior restorations.' },
  },

  // ── RESTAURATION — Composites Bisco ───────────────────────────
  {
    name: { fr: 'Bisco Micro Esthétique', en: 'Bisco Micro Esthetic' },
    brand: 'Bisco', category: 'restauration', price: 280,
    description: { fr: 'Composite microhybride Bisco Micro Esthetic, transparence naturelle et polissage miroir pour restaurations antérieures esthétiques.', en: 'Bisco Micro Esthetic microhybrid composite, natural translucency and mirror polish for aesthetic anterior restorations.' },
  },
  {
    name: { fr: 'Bisco Nano Fil Unique', en: 'Bisco Nano Fil Unique' },
    brand: 'Bisco', category: 'restauration', price: 320,
    description: { fr: 'Composite nanochargé Bisco Nano Fil, haute résistance à l\'usure et polissabilité durable pour les deux arcades.', en: 'Bisco Nano Fil nanofilled composite, high wear resistance and long-lasting polishability for both arches.' },
  },
  {
    name: { fr: 'Bisco Nano Fil Flow', en: 'Bisco Nano Fil Flow' },
    brand: 'Bisco', category: 'restauration', price: 280,
    description: { fr: 'Composite fluide nanochargé Bisco Nano Fil Flow, adaptation marginale parfaite et fluidité contrôlée.', en: 'Bisco Nano Fil Flow nanofilled flowable composite, perfect marginal adaptation and controlled fluidity.' },
  },
  {
    name: { fr: 'Bisco Bulk Fill', en: 'Bisco Bulk Fill' },
    brand: 'Bisco', category: 'restauration', price: 320,
    description: { fr: 'Composite Bisco Bulk Fill, polymérisation en couche unique jusqu\'à 5mm, retrait de polymérisation réduit.', en: 'Bisco Bulk Fill composite, single layer polymerization up to 5mm, reduced polymerization shrinkage.' },
  },
  {
    name: { fr: 'Bisco Nano Fil N', en: 'Bisco Nano Fil N' },
    brand: 'Bisco', category: 'restauration', price: 300,
    description: { fr: 'Composite nanochargé Bisco Nano Fil N, propriétés optiques améliorées pour intégration esthétique optimale.', en: 'Bisco Nano Fil N nanofilled composite, enhanced optical properties for optimal aesthetic integration.' },
  },
  {
    name: { fr: 'Bisco Micro Esthétique Gingiva', en: 'Bisco Micro Esthetic Gingival' },
    brand: 'Bisco', category: 'restauration', price: 280,
    description: { fr: 'Composite microhybride Bisco Micro Esthetic teinte Gingiva, restauration des défauts cervicaux et reconstruction gingivale.', en: 'Bisco Micro Esthetic Gingival microhybrid composite, restoration of cervical defects and gingival reconstruction.' },
  },

  // ── RECONSTITUTION — Adhésifs ─────────────────────────────────
  {
    name: { fr: 'Adhésif Single Bond 2', en: 'Single Bond 2 Adhesive' },
    brand: '3M', category: 'reconstitution', price: 580,
    description: { fr: 'Adhésif dentaire Scotchbond Single Bond 2 3M, mordançage total en deux étapes, haute résistance d\'adhésion à l\'émail et à la dentine.', en: '3M Scotchbond Single Bond 2 dental adhesive, two-step total-etch, high bond strength to enamel and dentin.' },
  },
  {
    name: { fr: 'Adhésif G Premio Bond', en: 'G Premio Bond Adhesive' },
    brand: 'GC', category: 'reconstitution', price: 650,
    description: { fr: 'Adhésif universel G Premio Bond GC, compatible mordançage sélectif et automordançant, force d\'adhésion exceptionnelle.', en: 'GC G Premio Bond universal adhesive, compatible with selective-etch and self-etch, exceptional bond strength.' },
  },
  {
    name: { fr: 'Adhésif Solare Universal Bond', en: 'Solare Universal Bond Adhesive' },
    brand: 'Shofu', category: 'reconstitution', price: 600,
    description: { fr: 'Adhésif universel Solare Universal Bond Shofu, applicabilité universelle, excellente adhésion sur toutes surfaces dentaires.', en: 'Shofu Solare Universal Bond universal adhesive, universal applicability, excellent adhesion on all dental surfaces.' },
  },
  {
    name: { fr: 'Adhésif Tetric N Bond', en: 'Tetric N Bond Adhesive' },
    brand: 'Ivoclar', category: 'reconstitution', price: 580,
    description: { fr: 'Adhésif Tetric N-Bond Ivoclar Vivadent, mordançage total, excellente compatibilité avec les composites Tetric et Variolink.', en: 'Ivoclar Vivadent Tetric N-Bond adhesive, total-etch, excellent compatibility with Tetric and Variolink composites.' },
  },
  {
    name: { fr: 'Adhésif Bisco All Bond Universal', en: 'Bisco All Bond Universal Adhesive' },
    brand: 'Bisco', category: 'reconstitution', price: 680,
    description: { fr: 'Adhésif universel Bisco All Bond Universal, multi-mode, haute résistance d\'adhésion, compatible avec toutes les procédures de collage.', en: 'Bisco All Bond Universal adhesive, multi-mode, high bond strength, compatible with all bonding procedures.' },
  },
  {
    name: { fr: 'Adhésif Z Prime Bisco', en: 'Z Prime Bisco Adhesive' },
    brand: 'Bisco', category: 'reconstitution', price: 620,
    description: { fr: 'Adhésif/primaire Bisco Z Prime Plus pour collage sur zircone, alumine et métaux, améliore significativement la rétention prothétique.', en: 'Bisco Z Prime Plus adhesive/primer for bonding to zirconia, alumina and metals, significantly improves prosthetic retention.' },
  },
  {
    name: { fr: 'Adhésif TE-Économe', en: 'TE-Économe Adhesive' },
    brand: 'Ivoclar', category: 'reconstitution', price: 520,
    description: { fr: 'Adhésif dentinaire TE-Économe Ivoclar, mordançage total, formule économique et performances cliniques fiables.', en: 'Ivoclar TE-Économe dentin adhesive, total-etch, economical formula and reliable clinical performance.' },
  },
  {
    name: { fr: 'Adhésif Monobond', en: 'Monobond Adhesive' },
    brand: 'Ivoclar', category: 'reconstitution', price: 680,
    description: { fr: 'Primaire universel Monobond Plus Ivoclar pour céramiques, zircone, métaux et composites, améliore l\'adhésion des ciments de collage.', en: 'Ivoclar Monobond Plus universal primer for ceramics, zirconia, metals and composites, improves bonding cement adhesion.' },
  },
  {
    name: { fr: 'Adhésif D Line', en: 'D Line Adhesive' },
    brand: 'D Line', category: 'reconstitution', price: 480,
    description: { fr: 'Adhésif universel D Line, multi-mode d\'application, formule simplifiée pour mordançage sélectif ou automordançant.', en: 'D Line universal adhesive, multi-mode application, simplified formula for selective-etch or self-etch.' },
  },

  // ── RECONSTITUTION — Acides de mordançage ─────────────────────
  {
    name: { fr: 'Acide Ultra Etch', en: 'Ultra Etch Acid' },
    brand: 'Ultradent', category: 'reconstitution', price: 380,
    description: { fr: 'Gel de mordançage phosphorique 35% Ultra Etch Ultradent, viscosité contrôlée et rinçage facile pour mordançage émail et dentine.', en: 'Ultradent Ultra Etch 35% phosphoric acid etching gel, controlled viscosity and easy rinsing for enamel and dentin etching.' },
  },
  {
    name: { fr: 'Acide Dentaflux 60g', en: 'Dentaflux Acid 60g' },
    brand: 'Dentaflux', category: 'reconstitution', price: 120,
    description: { fr: 'Gel d\'acide phosphorique 37% Dentaflux, conditionnement économique 60g pour mordançage émail et dentine.', en: 'Dentaflux 37% phosphoric acid gel, economical 60g packaging for enamel and dentin etching.' },
  },
  {
    name: { fr: 'Acide I Gel', en: 'I Gel Acid' },
    brand: 'Sans Marque', category: 'reconstitution', price: 100,
    description: { fr: 'Gel de mordançage phosphorique I Gel 37%, viscosité stable, application précise et rinçage rapide.', en: 'I Gel 37% phosphoric acid etching gel, stable viscosity, precise application and quick rinse.' },
  },
  {
    name: { fr: 'Acide Porcelain Etch avec Silane', en: 'Porcelain Etch Acid with Silane' },
    brand: 'Bisco', category: 'reconstitution', price: 450,
    description: { fr: 'Acide fluorhydrique 9% Bisco Porcelain Etchant avec silane inclus, préparation de surface céramique pour collage optimal des facettes et inlays.', en: 'Bisco 9% hydrofluoric acid Porcelain Etchant with silane included, ceramic surface preparation for optimal bonding of veneers and inlays.' },
  },
  {
    name: { fr: 'Porcelain Etch sans Silane', en: 'Porcelain Etch without Silane' },
    brand: 'Sans Marque', category: 'reconstitution', price: 320,
    description: { fr: 'Gel d\'acide fluorhydrique pour mordançage des céramiques feldspathiques avant collage, sans silane.', en: 'Hydrofluoric acid gel for etching feldspathic ceramics before bonding, without silane.' },
  },
  {
    name: { fr: 'Condac Porcelana', en: 'Condac Porcelana' },
    brand: 'FGM', category: 'reconstitution', price: 280,
    description: { fr: 'Gel d\'acide fluorhydrique Condac Porcelana 10% FGM, mordançage sécurisé des céramiques pour collage de facettes et inlays.', en: 'FGM Condac Porcelana 10% hydrofluoric acid gel, safe ceramic etching for veneer and inlay bonding.' },
  },
  {
    name: { fr: 'Prosil', en: 'Prosil' },
    brand: 'Sans Marque', category: 'reconstitution', price: 250,
    description: { fr: 'Silane de couplage Prosil pour améliorer l\'adhésion entre les céramiques et les ciments de collage résine.', en: 'Prosil coupling silane to improve adhesion between ceramics and resin bonding cements.' },
  },

  // ── RECONSTITUTION — Provisoires ──────────────────────────────
  {
    name: { fr: 'Acrytemp', en: 'Acrytemp' },
    brand: 'Sans Marque', category: 'reconstitution', price: 400,
    description: { fr: 'Résine bis-acrylique autopolymérisante Acrytemp pour couronnes et bridges provisoires de haute qualité esthétique.', en: 'Acrytemp self-curing bis-acrylic resin for high aesthetic quality provisional crowns and bridges.' },
  },
  {
    name: { fr: 'Bright Temporary', en: 'Bright Temporary' },
    brand: 'Sans Marque', category: 'reconstitution', price: 380,
    description: { fr: 'Composite bis-acrylique Bright Temporary pour prothèses provisoires, excellente esthétique et résistance mécanique satisfaisante.', en: 'Bright Temporary bis-acrylic composite for provisional prosthetics, excellent aesthetics and satisfactory mechanical strength.' },
  },
  {
    name: { fr: 'Unifast 3', en: 'Unifast 3' },
    brand: 'GC', category: 'reconstitution', price: 550,
    description: { fr: 'Résine acrylique Unifast 3 GC pour couronnes et bridges provisoires, polymérisation rapide et stabilité colorimétrique.', en: 'GC Unifast 3 acrylic resin for provisional crowns and bridges, quick polymerization and color stability.' },
  },
  {
    name: { fr: 'Visalys Temp', en: 'Visalys Temp' },
    brand: 'Kettenbach', category: 'reconstitution', price: 680,
    description: { fr: 'Composite bis-acrylique Visalys Temp Kettenbach, esthétique optimale et résistance aux contraintes mécaniques pour provisoires longue durée.', en: 'Kettenbach Visalys Temp bis-acrylic composite, optimal aesthetics and resistance to mechanical stress for long-term provisionals.' },
  },

  // ── RECONSTITUTION — Mordançage porcelaine & Préparation surface
  {
    name: { fr: 'Bisco Porcelain Etchant', en: 'Bisco Porcelain Etchant' },
    brand: 'Bisco', category: 'reconstitution', price: 380,
    description: { fr: 'Acide fluorhydrique Bisco Porcelain Etchant pour mordançage des céramiques avant collage, application précise et sécurisée.', en: 'Bisco Porcelain Etchant hydrofluoric acid for ceramic etching before bonding, precise and safe application.' },
  },
  {
    name: { fr: 'Uni Etch', en: 'Uni Etch' },
    brand: 'Bisco', category: 'reconstitution', price: 320,
    description: { fr: 'Gel de mordançage Uni Etch Bisco 32% phosphorique, viscosité maîtrisée pour mordançage sélectif de l\'émail.', en: 'Bisco Uni Etch 32% phosphoric acid etching gel, controlled viscosity for selective enamel etching.' },
  },

  // ── RECONSTITUTION — Core build-up ───────────────────────────
  {
    name: { fr: 'Dentocore Body Itena', en: 'Dentocore Body Itena' },
    brand: 'Itena', category: 'reconstitution', price: 580,
    description: { fr: 'Composite de reconstitution coronaire Dentocore Body Itena, dual-cure, haute résistance mécanique pour piliers de couronne.', en: 'Itena Dentocore Body dual-cure core build-up composite, high mechanical strength for crown abutments.' },
  },
  {
    name: { fr: 'Core Flo Bisco', en: 'Core Flo Bisco' },
    brand: 'Bisco', category: 'reconstitution', price: 620,
    description: { fr: 'Composite fluide de reconstitution Core Flo Bisco dual-cure, injection facile et haute résistance pour reconstitution coronaire.', en: 'Bisco Core Flo dual-cure flowable core build-up composite, easy injection and high strength for core reconstruction.' },
  },
  {
    name: { fr: 'All Cem Core', en: 'All Cem Core' },
    brand: 'FGM', category: 'reconstitution', price: 650,
    description: { fr: 'Système de reconstitution coronaire All Cem Core FGM, dual-cure, avec adhésif universel intégré, pratique et performant.', en: 'FGM All Cem Core crown reconstruction system, dual-cure, with integrated universal adhesive, convenient and effective.' },
  },
  {
    name: { fr: 'Gradia Core GC', en: 'Gradia Core GC' },
    brand: 'GC', category: 'reconstitution', price: 680,
    description: { fr: 'Composite de reconstruction coronaire Gradia Core GC, haute radio-opacité, distingue visuellement la reconstitution de la dent.', en: 'GC Gradia Core crown reconstruction composite, high radiopacity, visually distinguishes reconstruction from tooth structure.' },
  },
  {
    name: { fr: 'Repo Core DC Bisco', en: 'Repo Core DC Bisco' },
    brand: 'Bisco', category: 'reconstitution', price: 620,
    description: { fr: 'Composite de reconstitution Repo Core DC Bisco dual-cure, grande facilité de manipulation et résistance élevée à la compression.', en: 'Bisco Repo Core DC dual-cure reconstruction composite, great handling ease and high compressive strength.' },
  },

  // ── RECONSTITUTION — Tenons fibre ────────────────────────────
  {
    name: { fr: 'Fibre Post Itena', en: 'Fiber Post Itena' },
    brand: 'Itena', category: 'reconstitution', price: 180,
    description: { fr: 'Tenons en fibre de verre Itena pré-imprégnés de résine, haute flexibilité et résistance, différentes tailles disponibles.', en: 'Itena pre-impregnated fiber glass posts, high flexibility and strength, various sizes available.' },
  },
  {
    name: { fr: 'Fibre Post Vivadent', en: 'Fiber Post Vivadent' },
    brand: 'Ivoclar', category: 'reconstitution', price: 220,
    description: { fr: 'Tenons en fibre de verre Ivoclar Vivadent, module d\'élasticité proche de la dentine, réduisant le risque de fracture radiculaire.', en: 'Ivoclar Vivadent fiber glass posts, modulus of elasticity close to dentin, reducing the risk of root fracture.' },
  },
  {
    name: { fr: 'Fibre Post', en: 'Fiber Post' },
    brand: 'Sans Marque', category: 'reconstitution', price: 150,
    description: { fr: 'Tenons en fibre de verre génériques, différentes formes et tailles, conditionnement économique pour usage quotidien en cabinet.', en: 'Generic fiber glass posts, various shapes and sizes, economical packaging for daily practice use.' },
  },
  {
    name: { fr: 'Fibre Post 3M', en: '3M Fiber Post' },
    brand: '3M', category: 'reconstitution', price: 280,
    description: { fr: 'Tenons en fibre de verre 3M ESPE RelyX Fiber Post, haute résistance à la flexion et compatibilité avec les ciments résine 3M.', en: '3M ESPE RelyX Fiber Post, high flexural strength and compatibility with 3M resin cements.' },
  },

  // ── RECONSTITUTION — Forêts canaux ───────────────────────────
  {
    name: { fr: 'Forêt Largo', en: 'Largo Drill' },
    brand: 'Sans Marque', category: 'reconstitution', price: 80,
    description: { fr: 'Forêt Largo à tige lisse pour élargissement canalaire radiculaire, préparation du logement des tenons.', en: 'Largo drill with smooth shaft for root canal widening, preparation of post space.' },
  },
  {
    name: { fr: 'Forêt Gates', en: 'Gates Drill' },
    brand: 'Sans Marque', category: 'reconstitution', price: 80,
    description: { fr: 'Forêts Gates Glidden pour élargissement coronaire et préparation d\'accès canalaire, différentes tailles disponibles.', en: 'Gates Glidden drills for coronal widening and canal access preparation, various sizes available.' },
  },

  // ── RECONSTITUTION — Collage facettes ────────────────────────
  {
    name: { fr: 'Choice 2 Kit Bisco', en: 'Bisco Choice 2 Kit' },
    brand: 'Bisco', category: 'reconstitution', price: 1200,
    description: { fr: 'Kit de collage Choice 2 Bisco pour facettes céramiques, résines composites teintées photopolymérisables, résistance et esthétique optimales.', en: 'Bisco Choice 2 bonding kit for ceramic veneers, tinted light-cured composite resins, optimal strength and aesthetics.' },
  },
  {
    name: { fr: 'Intraoral Repair Kit Bisco', en: 'Bisco Intraoral Repair Kit' },
    brand: 'Bisco', category: 'reconstitution', price: 950,
    description: { fr: 'Kit de réparation intra-buccale Bisco pour restaurations en céramique et composites, réparation directe sans dépose prothétique.', en: 'Bisco intraoral repair kit for ceramic and composite restorations, direct repair without prosthetic removal.' },
  },
  {
    name: { fr: 'RelyX Veneer 3M', en: '3M RelyX Veneer' },
    brand: '3M', category: 'reconstitution', price: 1100,
    description: { fr: 'Ciment résine photopolymérisable RelyX Veneer 3M, translucidité optimale et haute résistance pour collage de facettes céramiques.', en: '3M RelyX Veneer light-cured resin cement, optimal translucency and high strength for ceramic veneer bonding.' },
  },
  {
    name: { fr: 'Variolink N', en: 'Variolink N' },
    brand: 'Ivoclar', category: 'reconstitution', price: 1200,
    description: { fr: 'Ciment de collage dual-cure Variolink N Ivoclar Vivadent, système complet pour collage de facettes, inlays et couronnes céramiques.', en: 'Ivoclar Vivadent Variolink N dual-cure bonding cement, complete system for bonding veneers, inlays and ceramic crowns.' },
  },

  // ── FRAISE — Finition & Polissage ────────────────────────────
  {
    name: { fr: 'Diamond Excel', en: 'Diamond Excel' },
    brand: 'AT Dental', category: 'fraise', price: 480,
    description: { fr: 'Pâte de polissage diamond Excel, formule abrasive graduée pour finition et brillance durable des restaurations composites.', en: 'Diamond Excel polishing paste, graduated abrasive formula for lasting finishing and shine on composite restorations.' },
  },
  {
    name: { fr: 'Spectra', en: 'Spectra' },
    brand: 'Sans Marque', category: 'fraise', price: 350,
    description: { fr: 'Système de finition Spectra, disques et cupules à granulométrie progressive pour polissage composite en 3 étapes.', en: 'Spectra finishing system, discs and cups with progressive granulometry for 3-step composite polishing.' },
  },
  {
    name: { fr: 'Dentaflux Polissage', en: 'Dentaflux Polishing' },
    brand: 'Dentaflux', category: 'fraise', price: 180,
    description: { fr: 'Pâte prophylactique Dentaflux pour polissage des dents et élimination des colorations de surface.', en: 'Dentaflux prophylactic paste for tooth polishing and removal of surface staining.' },
  },
  {
    name: { fr: 'Detartrex', en: 'Detartrex' },
    brand: 'Sans Marque', category: 'fraise', price: 350,
    description: { fr: 'Pâte prophylactique Detartrex légèrement abrasive pour détartrage et nettoyage des surfaces dentaires.', en: 'Detartrex slightly abrasive prophylactic paste for scaling and cleaning of dental surfaces.' },
  },
  {
    name: { fr: 'Cavex Prophy Paste', en: 'Cavex Prophy Paste' },
    brand: 'Cavex', category: 'fraise', price: 180,
    description: { fr: 'Pâte de prophylaxie Cavex, texture crémeuse, arôme agréable et nettoyage efficace des surfaces dentaires pour bilan de santé bucco-dentaire.', en: 'Cavex prophylaxis paste, creamy texture, pleasant flavor and effective dental surface cleaning for oral health check-ups.' },
  },
  {
    name: { fr: 'Cupule Dochem', en: 'Dochem Cup' },
    brand: 'Dochem', category: 'fraise', price: 80,
    description: { fr: 'Cupules de prophylaxie Dochem usage unique en caoutchouc souple, compatibles avec tous les contre-angles bague rouge.', en: 'Dochem single-use soft rubber prophylaxis cups, compatible with all red-ring contra-angles.' },
  },
  {
    name: { fr: 'Kit Polissage Composite', en: 'Composite Polishing Kit' },
    brand: 'Sans Marque', category: 'fraise', price: 450,
    description: { fr: 'Kit complet de polissage composite avec pointes, cupules et disques à granulométrie progressive, finition en 4 étapes.', en: 'Complete composite polishing kit with tips, cups and discs at progressive granulometry, 4-step finishing.' },
  },
  {
    name: { fr: 'Kit Disque Tor', en: 'Tor Disc Kit' },
    brand: 'Sans Marque', category: 'fraise', price: 380,
    description: { fr: 'Kit de disques de polissage Tor, différentes granulométries, pour finition des composites et céramiques en bouche.', en: 'Tor polishing disc kit, different granulometries, for finishing composites and ceramics intraorally.' },
  },
  {
    name: { fr: 'Brossette de Polissage', en: 'Polishing Brush' },
    brand: 'Sans Marque', category: 'fraise', price: 60,
    description: { fr: 'Brossettes de prophylaxie à poils doux ou rigides, usage unique, pour polissage de routine avec pâte prophylactique.', en: 'Soft or stiff prophylaxis brushes, single-use, for routine polishing with prophylactic paste.' },
  },
  {
    name: { fr: 'Cupule Jota', en: 'Jota Cup' },
    brand: 'Jota', category: 'fraise', price: 90,
    description: { fr: 'Cupules de polissage Jota en silicone, montées sur bague, finition et brillance des composites en plusieurs duretés.', en: 'Jota silicone polishing cups, ring-mounted, composite finishing and polishing in several hardnesses.' },
  },
  {
    name: { fr: 'Fraise Jota Diamantée / Endo-Z / Zekrya / À Os', en: 'Jota Diamond / Endo-Z / Zekrya / Bone Bur' },
    brand: 'Jota', category: 'fraise', price: 160,
    description: { fr: 'Fraises dentaires Jota suisses : diamantées pour préparation, Endo-Z et Zekrya pour fraisage guidé, à os pour chirurgie osseuse.', en: 'Swiss Jota dental burs: diamond-coated for preparation, Endo-Z and Zekrya for guided milling, bone burs for osseous surgery.' },
  },
  {
    name: { fr: 'Fraise Mani Diamantée / Endo-Z / Zekrya', en: 'Mani Diamond / Endo-Z / Zekrya Bur' },
    brand: 'Mani', category: 'fraise', price: 70,
    description: { fr: 'Fraises Mani japonaises : diamantées à grain précis, Endo-Z et Zekrya sécurisées pour préparations canalaires et cavitaires.', en: 'Japanese Mani burs: precise-grain diamond, Endo-Z and Zekrya for safe canal and cavity preparations.' },
  },
  {
    name: { fr: 'Fraise Horico Diamantée / Endo-Z / Zekrya / À Os', en: 'Horico Diamond / Endo-Z / Zekrya / Bone Bur' },
    brand: 'Horico', category: 'fraise', price: 150,
    description: { fr: 'Fraises Horico allemandes de précision : diamantées, Endo-Z, Zekrya et à os, qualité supérieure pour toutes les préparations dentaires.', en: 'Precision German Horico burs: diamond, Endo-Z, Zekrya and bone, superior quality for all dental preparations.' },
  },

  // ── INSTRUMENTATION — Instruments Falcon ─────────────────────
  {
    name: { fr: 'Manches Miroirs à Bouche', en: 'Mouth Mirror Handles' },
    brand: 'Falcon', category: 'instrumentation', price: 180,
    description: { fr: 'Manches pour miroirs à bouche Falcon en acier inoxydable, octogonaux anti-dérapants, compatible têtes de miroirs standard.', en: 'Falcon stainless steel octagonal anti-slip mouth mirror handles, compatible with standard mirror heads.' },
  },
  {
    name: { fr: 'Sonde Dentaire', en: 'Dental Probe' },
    brand: 'Falcon', category: 'instrumentation', price: 120,
    description: { fr: 'Sonde dentaire Falcon à crochet double en acier inoxydable, pour exploration canalaire et détection des caries.', en: 'Falcon double-ended stainless steel dental probe for canal exploration and caries detection.' },
  },
  {
    name: { fr: 'Décolleur', en: 'Elevateur / Periosteal Elevator' },
    brand: 'Falcon', category: 'instrumentation', price: 150,
    description: { fr: 'Décolleur périosté Falcon en acier inoxydable, pour décoller les tissus gingivaux et osseux lors des actes chirurgicaux.', en: 'Falcon stainless steel periosteal elevator for separating gingival and bone tissues during surgical procedures.' },
  },
  {
    name: { fr: 'Curette Dentaire', en: 'Dental Curette' },
    brand: 'Falcon', category: 'instrumentation', price: 160,
    description: { fr: 'Curette dentaire Falcon universelle ou de Gracey, acier inoxydable, pour détartrage sous-gingival et surfaçage radiculaire.', en: 'Falcon universal or Gracey dental curette, stainless steel, for subgingival scaling and root planing.' },
  },
  {
    name: { fr: 'Burnissoir', en: 'Burnisher' },
    brand: 'Falcon', category: 'instrumentation', price: 140,
    description: { fr: 'Burnissoirs Falcon pour condensation et adaptation des amalgames et composites, extrémités ball ou discoid-cleoid.', en: 'Falcon burnishers for condensation and adaptation of amalgams and composites, ball or discoid-cleoid tips.' },
  },
  {
    name: { fr: 'Spatule à Ciment', en: 'Cement Spatula' },
    brand: 'Falcon', category: 'instrumentation', price: 130,
    description: { fr: 'Spatules à ciment Falcon en acier inoxydable, pour malaxage des ciments et liners, différentes formes d\'extrémités.', en: 'Falcon stainless steel cement spatulas for mixing cements and liners, various tip shapes.' },
  },
  {
    name: { fr: 'Spatule de Bouche', en: 'Mouth Spatula' },
    brand: 'Falcon', category: 'instrumentation', price: 120,
    description: { fr: 'Spatule de bouche Falcon flexible en acier inoxydable, pour manipulation et insertion des composites en bouche.', en: 'Falcon flexible stainless steel mouth spatula for manipulation and insertion of composites intraorally.' },
  },
  {
    name: { fr: 'Râpe à Os', en: 'Bone File' },
    brand: 'Falcon', category: 'instrumentation', price: 280,
    description: { fr: 'Râpe à os Falcon en acier inoxydable, pour remodelage osseux lors d\'alvéoloplasties et régularisation des crêtes.', en: 'Falcon stainless steel bone file for bone remodeling during alveoloplasties and ridge regularization.' },
  },
  {
    name: { fr: 'Castroviejo', en: 'Castroviejo' },
    brand: 'Falcon', category: 'instrumentation', price: 450,
    description: { fr: 'Ciseaux de Castroviejo Falcon à lames droites ou courbes, acier inoxydable, pour la chirurgie des tissus mous.', en: 'Falcon Castroviejo scissors with straight or curved blades, stainless steel, for soft tissue surgery.' },
  },
  {
    name: { fr: 'Plateaux Instruments Grand/Petit', en: 'Large/Small Instrument Trays' },
    brand: 'Falcon', category: 'instrumentation', price: 220,
    description: { fr: 'Plateaux d\'instruments Falcon en acier inoxydable, disponibles en grand et petit formats, stérilisables en autoclave.', en: 'Falcon stainless steel instrument trays, available in large and small sizes, autoclave sterilizable.' },
  },
  {
    name: { fr: 'Sondes Parodontales Graduées', en: 'Graduated Periodontal Probes' },
    brand: 'Falcon', category: 'instrumentation', price: 180,
    description: { fr: 'Sondes parodontales Falcon graduées en millimètres, pour mesure de la profondeur des poches parodontales.', en: 'Falcon periodontal probes graduated in millimeters for measuring periodontal pocket depth.' },
  },
  {
    name: { fr: 'Élévateurs à Racine', en: 'Root Elevators' },
    brand: 'Falcon', category: 'instrumentation', price: 350,
    description: { fr: 'Élévateurs à racine Falcon, série complète en acier inoxydable, pour luxation et extraction atraumatique des racines.', en: 'Falcon root elevators, complete stainless steel series for atraumatic root luxation and extraction.' },
  },
  {
    name: { fr: 'Chompret-Syndesmotomes', en: 'Chompret Syndesmotome' },
    brand: 'Falcon', category: 'instrumentation', price: 280,
    description: { fr: 'Chomprets et syndesmotomes Falcon pour section des fibres desmodontales et préparation atraumatique de l\'avulsion.', en: 'Falcon chomprets and syndesmotomes for cutting desmodontal fibers and atraumatic avulsion preparation.' },
  },
  {
    name: { fr: 'Porte-Aiguilles', en: 'Needle Holder' },
    brand: 'Falcon', category: 'instrumentation', price: 200,
    description: { fr: 'Porte-aiguilles Falcon type Mathieu ou Crile-Wood, acier inoxydable, pour sutures chirurgicales intra-buccales.', en: 'Falcon Mathieu or Crile-Wood needle holders, stainless steel, for intraoral surgical sutures.' },
  },
  {
    name: { fr: 'Pince Mathieu', en: 'Mathieu Forceps' },
    brand: 'Falcon', category: 'instrumentation', price: 180,
    description: { fr: 'Pince Mathieu Falcon à ressort de rappel, acier inoxydable, pour saisir et manipuler les fils de suture.', en: 'Falcon Mathieu spring-action forceps, stainless steel, for grasping and manipulating suture threads.' },
  },
  {
    name: { fr: 'Précelle Mathieu', en: 'Mathieu Tweezers' },
    brand: 'Falcon', category: 'instrumentation', price: 160,
    description: { fr: 'Précelles Mathieu Falcon fines, acier inoxydable, pour manipulation délicate des fils, matériaux et petits instruments.', en: 'Falcon fine Mathieu tweezers, stainless steel, for delicate handling of threads, materials and small instruments.' },
  },
  {
    name: { fr: 'Ciseau à Os', en: 'Bone Chisel' },
    brand: 'Falcon', category: 'instrumentation', price: 140,
    description: { fr: 'Ciseau à os Falcon en acier inoxydable, pour section et remodelage osseux lors d\'actes de chirurgie orale.', en: 'Falcon stainless steel bone chisel for cutting and bone remodeling during oral surgery.' },
  },
  {
    name: { fr: 'Excavateur', en: 'Excavator' },
    brand: 'Falcon', category: 'instrumentation', price: 120,
    description: { fr: 'Excavateurs Falcon double extrémité en acier inoxydable, pour élimination de la dentine cariée et nettoyage cavitaire.', en: 'Falcon double-ended stainless steel excavators for carious dentin removal and cavity cleaning.' },
  },
  {
    name: { fr: 'Fouloir', en: 'Plugger' },
    brand: 'Falcon', category: 'instrumentation', price: 130,
    description: { fr: 'Fouloirs Falcon en acier inoxydable, extrémités lisse ou striées, pour condensation des matériaux d\'obturation.', en: 'Falcon stainless steel pluggers with smooth or serrated tips for condensation of obturation materials.' },
  },

  // ── PETIT ÉQUIPEMENT — Moteurs endodontiques ─────────────────
  {
    name: { fr: 'Moteur Endo Radar Pro Woodpecker', en: 'Woodpecker Radar Pro Endo Motor' },
    brand: 'Woodpecker', category: 'petit-equipement', price: 7500,
    description: { fr: 'Moteur endodontique Woodpecker Radar Pro, localisateur d\'apex intégré, 5 modes de fonctionnement et programmes NiTi préréglés.', en: 'Woodpecker Radar Pro endodontic motor, integrated apex locator, 5 operating modes and preset NiTi programs.' },
  },
  {
    name: { fr: 'Moteur Endo COXO', en: 'COXO Endo Motor' },
    brand: 'COXO', category: 'petit-equipement', price: 6800,
    description: { fr: 'Moteur endodontique COXO, localisateur d\'apex intégré C-ROOT, couple constant, compatible tous systèmes de limes NiTi.', en: 'COXO endodontic motor with C-ROOT integrated apex locator, constant torque, compatible with all NiTi file systems.' },
  },
  {
    name: { fr: 'Moteur Endo NSK DT', en: 'NSK DT Endo Motor' },
    brand: 'NSK', category: 'petit-equipement', price: 8500,
    description: { fr: 'Moteur endodontique NSK DT, précision japonaise, couple élevé et constant, localisateur d\'apex et programmes avancés.', en: 'NSK DT endodontic motor, Japanese precision, high and constant torque, apex locator and advanced programs.' },
  },
  {
    name: { fr: 'Moteur Endo Ionyx', en: 'Ionyx Endo Motor' },
    brand: 'Ionyx', category: 'petit-equipement', price: 5500,
    description: { fr: 'Moteur endodontique Ionyx, compact et ergonomique, localisateur d\'apex intégré, idéal pour une pratique endodontique efficace.', en: 'Ionyx endodontic motor, compact and ergonomic, integrated apex locator, ideal for efficient endodontic practice.' },
  },

  // ── PETIT ÉQUIPEMENT — Lampes photopolymérisation ─────────────
  {
    name: { fr: 'Lampe O Light', en: 'O Light Curing Lamp' },
    brand: 'Woodpecker', category: 'petit-equipement', price: 1200,
    description: { fr: 'Lampe de photopolymérisation Woodpecker O Light LED, sans fil, légère et équilibrée pour une utilisation prolongée en cabinet.', en: 'Woodpecker O Light LED light-curing lamp, cordless, lightweight and balanced for extended in-office use.' },
  },
  {
    name: { fr: 'Lampe COXO Nano', en: 'COXO Nano Curing Lamp' },
    brand: 'COXO', category: 'petit-equipement', price: 1800,
    description: { fr: 'Lampe de photopolymérisation COXO Nano LED, ultra-compacte, haute intensité lumineuse, recharge rapide.', en: 'COXO Nano LED light-curing lamp, ultra-compact, high light intensity, fast charging.' },
  },
  {
    name: { fr: 'Lampe Valo X', en: 'Valo X Curing Lamp' },
    brand: 'Ultradent', category: 'petit-equipement', price: 8500,
    description: { fr: 'Lampe de photopolymérisation Ultradent Valo X, multi-spectre 395–480nm, 3200mW/cm², polymérisation profonde et uniforme.', en: 'Ultradent Valo X light-curing lamp, multi-spectrum 395–480nm, 3200mW/cm², deep and uniform polymerization.' },
  },

  // ── PETIT ÉQUIPEMENT — Détartreurs ───────────────────────────
  {
    name: { fr: 'Détartreur Max Peizo 7+', en: 'Max Peizo 7+ Scaler' },
    brand: 'DTE', category: 'petit-equipement', price: 3200,
    description: { fr: 'Détartreur piézoélectrique DTE Max Piezo 7+, 7 inserts inclus, puissance réglable, compatible pièces à main SATELEC et EMS.', en: 'DTE Max Piezo 7+ piezoelectric scaler, 7 inserts included, adjustable power, compatible with SATELEC and EMS handpieces.' },
  },

  // ── PETIT ÉQUIPEMENT — Turbines ──────────────────────────────
  {
    name: { fr: 'Turbine Apple Dent LED/Sans LED', en: 'Apple Dent Turbine LED/Without LED' },
    brand: 'Apple Dent', category: 'petit-equipement', price: 480,
    description: { fr: 'Turbine dentaire Apple Dent disponible avec ou sans LED, haute vitesse, stérilisable autoclave 135°C.', en: 'Apple Dent dental turbine available with or without LED, high speed, 135°C autoclave sterilizable.' },
  },
  {
    name: { fr: 'Turbine Skyma LED/Sans LED', en: 'Skyma Turbine LED/Without LED' },
    brand: 'Skyma', category: 'petit-equipement', price: 550,
    description: { fr: 'Turbine dentaire Skyma disponible en version LED ou sans LED, couple élevé, stérilisable, compatible raccords standard.', en: 'Skyma dental turbine available in LED or non-LED version, high torque, sterilizable, compatible with standard couplings.' },
  },
  {
    name: { fr: 'Turbine COXO LED/Sans LED', en: 'COXO Turbine LED/Without LED' },
    brand: 'COXO', category: 'petit-equipement', price: 650,
    description: { fr: 'Turbine dentaire COXO avec ou sans LED, haute performance et longévité, rotation stable sous charge et roulement de précision.', en: 'COXO dental turbine with or without LED, high performance and longevity, stable rotation under load with precision bearings.' },
  },
  {
    name: { fr: 'Turbine NSK LED/Sans LED', en: 'NSK Turbine LED/Without LED' },
    brand: 'NSK', category: 'petit-equipement', price: 2200,
    description: { fr: 'Turbine dentaire NSK haute performance disponible avec éclairage LED ou sans LED, fabrication japonaise, couple élevé et précision de coupe.', en: 'NSK high-performance dental turbine available with or without LED lighting, Japanese manufacturing, high torque and cutting precision.' },
  },

  // ── PETIT ÉQUIPEMENT — Contre-angles & Kits ──────────────────
  {
    name: { fr: 'Kit Rotatif 3pcs Skyma Class A/Class B', en: 'Skyma 3-piece Rotary Kit Class A/B' },
    brand: 'Skyma', category: 'petit-equipement', price: 850,
    description: { fr: 'Kit rotatif Skyma 3 pièces turbine + contre-angle + bague rouge, disponible en Class A ou Class B, rapport qualité-prix optimal.', en: 'Skyma 3-piece rotary kit turbine + contra-angle + red ring, available in Class A or Class B, optimal value for money.' },
  },
  {
    name: { fr: 'Contre Angle Skyma Class A', en: 'Skyma Class A Contra-Angle' },
    brand: 'Skyma', category: 'petit-equipement', price: 380,
    description: { fr: 'Contre-angle bague rouge Skyma Class A, réduction 1:5, stérilisable autoclave, compatible fraises ISO standard.', en: 'Skyma Class A red ring contra-angle, 1:5 reduction, autoclave sterilizable, compatible with standard ISO burs.' },
  },
  {
    name: { fr: 'Contre Angle Skyma Class B', en: 'Skyma Class B Contra-Angle' },
    brand: 'Skyma', category: 'petit-equipement', price: 450,
    description: { fr: 'Contre-angle bague rouge Skyma Class B, transmission améliorée, couple supérieur, stérilisable et compatible fraises standard.', en: 'Skyma Class B red ring contra-angle, improved transmission, higher torque, sterilizable and compatible with standard burs.' },
  },

  // ── PETIT ÉQUIPEMENT — Aéropolisseurs ────────────────────────
  {
    name: { fr: 'Aéropolisseur NSK', en: 'NSK Air Polisher' },
    brand: 'NSK', category: 'petit-equipement', price: 3800,
    description: { fr: 'Aéropolisseur NSK Prophy-Mate Neo, jet d\'eau/poudre pour nettoyage prophylactique supra et sous-gingival, embout rotatif 360°.', en: 'NSK Prophy-Mate Neo air polisher, water/powder jet for supra and subgingival prophylactic cleaning, 360° rotating tip.' },
  },
  {
    name: { fr: 'Aéropolisseur Woodpecker', en: 'Woodpecker Air Polisher' },
    brand: 'Woodpecker', category: 'petit-equipement', price: 2800,
    description: { fr: 'Aéropolisseur Woodpecker, nettoyage prophylactique efficace par projection de poudre et eau, embouts interchangeables.', en: 'Woodpecker air polisher, effective prophylactic cleaning by powder and water projection, interchangeable nozzles.' },
  },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connecté')

  let inserted = 0
  let skipped = 0

  for (const p of newProducts) {
    const slug = p.name.fr
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      + '-' + p.brand.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')

    const exists = await Product.findOne({ slug })
    if (exists) {
      console.log(`  SKIP (existe déjà): ${p.name.fr}`)
      skipped++
      continue
    }

    await Product.create({ ...p, inStock: true, featured: false, images: [], tags: [] })
    console.log(`  + Créé: ${p.name.fr} (${p.brand})`)
    inserted++
  }

  console.log(`\nTerminé — ${inserted} produits créés, ${skipped} ignorés.`)
  await mongoose.disconnect()
}

run().catch((err) => { console.error(err); process.exit(1) })
