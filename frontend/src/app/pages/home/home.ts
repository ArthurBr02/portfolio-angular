import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Skills } from '../../components/skills/skills';
import { Uf } from '../../components/uf/uf';
import { Projects } from '../../components/projects/projects';
import { Education } from '../../components/education/education';
import { Experience } from '../../components/experience/experience';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    About,
    Skills,
    Uf,
    Projects,
    Education,
    Experience,
    Contact,
    Footer,
    Navbar
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
}
