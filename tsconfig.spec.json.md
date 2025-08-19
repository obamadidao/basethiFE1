////////////////////////////////////////////////app.routes.ts
export const routes: Routes = [
    {
        path:'',
        component: List,
    },
    {
        path:'add',
        component: Add,
    },
    {
        path:'update/:id',
        component: Update,
    },
    {
        path:'register',
        component: Register,
    },
    {
        path:'login',
        component: Login,
    },
];
////////////////////////////////////////////////service.ts
export class Service {
constructor(private http: HttpClient){}
register(values :any){
  return this.http.post("http://localhost:3000/register", values)
}
login(values :any){
  return this.http.post("http://localhost:3000/login", values)
}
add(values :any){
  return this.http.post("http://localhost:3000/events", values)
}
update(id: any, values :any){
  return this.http.put(`http://localhost:3000/events/${id}`, values)
}
delete(id :any){
  return this.http.delete(`http://localhost:3000/events/${id}`)
}
getAll(){
  return this.http.get("http://localhost:3000/events")
}
getOne(id: any){
  return this.http.get(`http://localhost:3000/events/${id}`)
}
}
////////////////////////////////////////////////list.ts
export class List {
  events: any = [];
  constructor(private service: Service) {}
  ngOnInit() {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.events = data;
      },
    });
  }
fetchData() {
    this.service.getAll().subscribe({
      next: (data) => {
        this.events = data;
      },
    });
  }
  trackById(index: number, item: any) {
    return item.id;
  }
  onDelete(id: number) {
    const confirmDelete = confirm('Xoa nhe?');
    if (confirmDelete) {
      this.service.delete(id).subscribe({
        next: () => {
          alert('Xóa thành công');
          this.fetchData(); 
        },
        error: () => {
          alert('Xóa thất bại');
        }
      });
    }
  }
}
////////////////////////////////////////////////add.ts
export class Add {
  form: FormGroup;
  constructor(private fb: FormBuilder,
     private service: Service,
      private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      type: ['', Validators.required], 
      note: ['', Validators.required],
      dateStart: ['', Validators.required],
      category: ['', Validators.required] 
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
      return;
    }
    this.service.add(this.form.value).subscribe({
      next: () => {
        alert('Thêm sự kiện thành công');
        this.router.navigate(['/']);  
      },
      error: () => {
        alert('Thêm sự kiện thất bại');
      }
    });
  }
}
////////////////////////////////////////////////update.ts
export class Update {
  form: FormGroup;
  id!: number;
  constructor(
    private fb: FormBuilder,
    private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      type: ['', Validators.required], 
      note: ['', Validators.required],
      dateStart: ['', Validators.required],
      category: ['', Validators.required] 
    });
  }
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!; 
    this.service.getOne(this.id).subscribe({
      next: (data) => this.form.patchValue(data),
      error: () => {
        alert('Không tìm thấy sự kiện');
        this.router.navigate(['/']);
      }
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
      return;
    }
    this.service.update(this.id, this.form.value).subscribe({
      next: () => {
        alert('Cập nhật sự kiện thành công');
        this.router.navigate(['/']);
      },
      error: () => alert('Cập nhật thất bại')
    });
  }
}
////////////////////////////////////////////////register.ts
export class Register {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: Service,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      alert('Vui lòng điền đúng thông tin đăng ký!');
      return;
    }
    this.service.register(this.form.value).subscribe({
      next: () => {
        alert('Đăng ký thành công, mời đăng nhập!');
        this.router.navigate(['/login']);
      },
      error: () => alert('Đăng ký thất bại, thử lại sau!'),
    });
  }
}
////////////////////////////////////////////////login.ts
export class Login {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: Service,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      alert('Vui lòng điền đầy đủ thông tin đăng nhập!');
      return;
    }
    this.service.login(this.form.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.accessToken);
        alert('Đăng nhập thành công!');
        this.router.navigate(['/']);
      },
      error: () => alert('Đăng nhập thất bại!'),
    });
  }
}
////////////////////////////////////////////////bao ve route
cap nhat lai path
{
path:'',
component: List,
canActivate: [AuthGuard] //// bao ve
},
{
path:'add',
component: Add,
canActivate: [AuthGuard] //// bao ve
},
////////////////////////////////////////////////auth.guard.ts
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Bạn cần đăng nhập để truy cập!');
      this.router.navigate(['/login']);
      return false;
    }
    const user = JSON.parse(userStr);
    if (user.id !== 2) {
      alert('Bạn không có quyền truy cập!');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
////////////////////////////////////////////////cap nhat lai login
localStorage.setItem('token', res.accessToken);
localStorage.setItem('user', JSON.stringify(res.user)); //// lưu user info
alert('Đăng nhập thành công!');