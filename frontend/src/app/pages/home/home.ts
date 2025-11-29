import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Skills } from '../../components/skills/skills';
import { Projects } from '../../components/projects/projects';
import { Education } from '../../components/education/education';
import { Experience } from '../../components/experience/experience';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    Hero,
    About,
    Skills,
    Projects,
    Education,
    Experience,
    Contact,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
}
