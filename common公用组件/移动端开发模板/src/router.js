import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Cart = () => import('views/cart/Cart');
const ProFile = () => import('views/profile/ProFile');


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      meta: { title: '首页' }
    },
    {
      path: '/category',
      component: Category,
      meta: { title: '商品分类' }
    },
    {
      path: '/cart',
      component: Cart,
      meta: { title: '购物车' }
    },
    {
      path: '/profile',
      component: ProFile,
      meta: { title: '个人资料' }
    }
  ]
});

// TODO 获取标题
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title;
  next();
});



export default router
