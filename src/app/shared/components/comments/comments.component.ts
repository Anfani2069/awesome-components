import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../../core/models/comment.module";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {
  animate,
  animateChild,
  group,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        query('@listItem', [
          stagger(200, [
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition('void => *', [
        query('.comment-text, .comment-date', [
          style({
            opacity: 0
          }),
        ]),
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          'background-color': 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
          transform: 'translateX(0)',
          opacity: 1,
          'background-color': 'white',
        })),
        group([
          // sequence([
          //   animate('250ms', style({
          //     'background-color': 'rgb(255,7,147)'
          //   })),
          //   animate('250ms', style({
          //     'background-color': 'white'
          //   })),
          // ]),
          query('.comment-text', [
            animate('250ms', style({
              opacity: 1
            }))
          ]),
          query('.comment-date', [
            animate('500ms', style({
              opacity: 1
            }))
          ]),
        ])
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  animationStates: { [key: number]: 'default' | 'active' } = {};
 // listItemAnimationState: 'default' | 'active' = 'default';
  constructor(private formBuider: FormBuilder) {
  }
  ngOnInit(): void{
      this.commentCtrl = this.formBuider.control('',[Validators.required, Validators.minLength(10)])
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      // une alternative à desactiver le boutton
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));

    // unshift pour mettre l'element au debut des autres
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      // to ISOString pour garder le meme format de date
      createdDate: new Date().toISOString(),
      userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
}
