import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

interface Objective {
  description: string;
  validation: string;
}

interface UnitFormation {
  code: string;
  title: string;
  objectives: Objective[];
}

@Component({
  selector: 'app-uf',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './uf.html',
  styleUrl: './uf.css',
  encapsulation: ViewEncapsulation.None
})
export class Uf {
  protected unitesFormation: UnitFormation[] = [
    {
      code: 'UF 7.1',
      title: 'VIE PROFESSIONNELLE : Maîtrise de Projet',
      objectives: [
        {
          description: 'Organisation, gestion du travail sur un ou plusieurs projets',
          validation: 'Je travaille sur plusieurs projets à la fois depuis 4 ans, donc je suis habitué à gérer mon temps et les priorités en fonction des projets. J\'essaye de faire les tâches rapides en première pour que le client puisse tester pendant que je fais le reste.'
        },
        {
          description: 'Mise en œuvre d\'une démarche structurée d\'analyse',
          validation: 'Pour chaque projet, je commence par analyser les besoins du client, puis je fais un point avec mon manager ou avec mes collègues pour valider mon analyse avant de commencer le développement. Cela permet de réduire les allers-retours avec le client et de gagner du temps.'
        },
        {
          description: 'Mobilisation des ressources humaines, techniques, documentaires nécessaires à la réalisation du projet',
          validation: 'Je cherche sur les documentations techniques (en ligne ou en interne) et je demande à mes collègues et mon manager en cas de difficultés à résoudre les problèmes techniques que je rencontre pendant le développement.'
        },
        {
          description: 'Mise en application des connaissances de l\'apprenti, de son expertise technique ou scientifique',
          validation: 'Je mets en pratique mes connaissances en développement web (frontend et backend) sur les projets clients, en utilisant les technologies que je maîtrise (Vue.js, TypeScript, Node.js, Java, etc.) et en apprenant de nouvelles technologies. Je mets aussi en oeuvre mes compétences en communication et en travail d\'équipe pour collaborer efficacement avec mes collègues et les clients.'
        }
      ]
    },
    {
      code: 'UF 7.2',
      title: 'TECHNIQUE : Programmation & Outillage',
      objectives: [
        {
          description: 'Connaissances des formats et des protocoles d\'échanges de données utilisés dans les projets de l\'entreprise et leurs manipulations (XML, JSON, blue scan par exemple)',
          validation: 'Je travaille régulièrement avec des APIs REST utilisant JSON pour l\'échange de données. J\'ai également manipulé des fichiers JSON dans certains projets et utilisé des outils comme Postman pour tester les APIs.'
        },
        {
          description: 'Connaissance et prise en main d\'outils liés à l\'environnement de travail',
          validation: 'J\'utilise régulièrement des outils comme Git pour le contrôle de version, Docker pour la containerisation, des IDE comme Visual Studio Code, et des pipelines CI/CD pour l\'intégration et le déploiement continus.'
        },
        {
          description: 'Découvrir et s\'approprier de nouvelles librairies de fonctions',
          validation: 'J\'ai exploré et intégré plusieurs bibliothèques et frameworks dans mes projets, tels que notre DAO interne pour les interactions avec les bases de données, Axios pour les requêtes HTTP, et Tailwind CSS pour le design. J\'ai appris à les utiliser efficacement pour améliorer la qualité et la maintenabilité du code.'
        }
      ]
    },
    {
      code: 'UF 7.3',
      title: 'TECHNIQUE – Développement WEB (option IPS) ou programmation système d\'exploitation (option ASTRE)',
      objectives: [
        {
          description: 'Mise en application des concepts de programmation web front & back (IPS)',
          validation: 'J\'ai développé des applications web complètes en utilisant Vue.js pour le frontend et Node.js pour le backend. J\'ai mis en place des APIs RESTful, géré les bases de données, et assuré la communication entre le frontend et le backend. J\'essaye également d\'optimiser l\'ergonomie et les performances des programmes que je fais pour le confort des utilisateurs.'
        },
        {
          description: 'Mise en application des concepts de programmation système (ASTRE)',
          validation: 'Pas réalisé dans le cadre de mon apprentissage.'
        },
        {
          description: 'Communication avec des périphériques en utilisant des pilotes d\'interruption (ASTRE)',
          validation: 'Pas réalisé dans le cadre de mon apprentissage.'
        },
        {
          description: 'Connaissance du fonctionnement d\'un système d\'exploitation (ASTRE)',
          validation: 'Pas réalisé dans le cadre de mon apprentissage.'
        },
        {
          description: 'Étude comparative par rapport à l\'existant dans le domaine public (ASTRE)',
          validation: 'Pas réalisé dans le cadre de mon apprentissage.'
        }
      ]
    }
  ];
}
