function fmt(n){
  return n.toLocaleString('ar-SA');
}

function updateSubtotal(card){
  const qtyEl = card.querySelector('.qty-value');
  const price = parseFloat(card.dataset.price);
  const qty = parseInt(qtyEl.textContent, 10);
  const subEl = card.querySelector('.product-subtotal');
  if(subEl){
    subEl.textContent = 'المجموع الفرعي: ' + fmt(price * qty) + ' ر.س';
  }
  return price * qty;
}

function updatePageTotal(){
  const totalEl = document.getElementById('page-total-value');
  if(!totalEl) return;
  let total = 0;
  document.querySelectorAll('.product-card').forEach(card=>{
    const qtyEl = card.querySelector('.qty-value');
    const price = parseFloat(card.dataset.price);
    const qty = parseInt(qtyEl.textContent, 10);
    total += price * qty;
  });
  totalEl.textContent = fmt(total) + ' ر.س';
}

document.addEventListener('click', function(e){
  const btn = e.target.closest('.qty-btn');
  if(!btn) return;
  const card = btn.closest('.product-card');
  const qtyEl = card.querySelector('.qty-value');
  let qty = parseInt(qtyEl.textContent, 10);
  if(btn.dataset.action === 'inc'){
    qty = Math.min(qty + 1, 99);
  } else {
    qty = Math.max(qty - 1, 0);
  }
  qtyEl.textContent = qty;
  updateSubtotal(card);
  updatePageTotal();
});

document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.product-card').forEach(updateSubtotal);
  updatePageTotal();
});
