export default function ({ route, redirect }) {
  if (route.fullPath === '/home') {
    return redirect('/')
  }
}
