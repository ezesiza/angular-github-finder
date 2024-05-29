import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, AfterViewInit, OnChanges {
  /** The total number of records */
  @Input()
  collectionSize = 100;

  /** The number of records to display */
  @Input()
  pageSize = 25;

  /** Current page */
  @Input()
  currentPage = 1;

  /** The number of buttons to show either side of the current page */
  @Input()
  maxSize = 2;

  /** Display the First/Last buttons */
  @Input()
  firstLastButtons = false;

  /** Display the Next/Previous buttons */
  @Input()
  nextPreviousButtons = true;

  /** Display small pagination buttons */
  @Input()
  small = false;

  /** Get the next batch of repositories */
  @Output()
  newPage: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number[] = [];

  /** Size of each batch of repositories list */
  size: number = 100;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.totalPages = new Array(
        Math.ceil(this.collectionSize / this.pageSize)
      );
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
  }

  selectPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getNextBatch();
  }

  next() {
    const nextPage = this.currentPage + 1;
    nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
    this.getNextBatch();
  }

  previous() {
    const previousPage = this.currentPage - 1;
    previousPage >= 1 && this.selectPageNumber(previousPage);
  }

  /** Notify RepoList query to get next batch of repositories */
  getNextBatch() {
    setTimeout(() => {
      if (this.totalPages.length - this.currentPage <= 0) {
        this.size += 100;
        this.newPage.emit(this.size);
      }
    });
  }
}
