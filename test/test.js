$(document).ready(function() {
  var f1, f1_inst;
  H5F.init($("form"), {
    immediate: true
  });
  H5F.errors({
    UNKNOWN_INPUT_TYPE: "{{LABEL}}字段为未知类型",
    COULD_NOT_BE_EMPTY: "{{LABEL}}的值不能为空",
    LENGTH_SMALLER_THAN_MINIMUM: "{{LABEL}}的字符串长度请保持在在 {{MINLENGTH}}-{{MAXLENGTH}}",
    LENGTH_BIGGER_THAN_MAXIMUM: "{{LABEL}}的字符串长度请保持在在 {{MINLENGTH}}-{{MAXLENGTH}}",
    INVALID_VALUE: "{{LABEL}}的值{{VALUE}}为无效值",
    NOT_AN_EMAIL: "{{LABEL}}不符合电子邮箱的格式",
    NOT_A_NUMBER: "{{LABEL}}不是数字",
    UNDERFLOW: "{{LABEL}}中所输入数字请在 {{MIN}}-{{MAX}} 范围内",
    OVERFLOW: "{{LABEL}}中所输入数字请在 {{MIN}}-{{MAX}} 范围内",
    DIFFERENT_VALUE: "{{LABEL}}的值没有与{{ASSOCIATE_LABEL}}保持一致",
    AT_LEAST_CHOOSE_ONE: "请从{{LABEL}}中选择一项",
    SHOOLD_BE_CHOSEN: "请选中{{UNIT_LABEL}}",
    SHOOLD_CHOOSE_AN_OPTION: "必须从{{LABEL}}中选择一项",
    NOT_A_MOBILE: "{{LABEL}}不是一个手机号码"
  });
  H5F.rules({
    MOBILE: {
      rule: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      message: "NOT_A_MOBILE"
    }
  });
  $("form").on({
    "H5F:valid": function(e, field) {
      return $(field.element).closest(".form-group").removeClass("has-error").children(".help-block").hide();
    },
    "H5F:invalid": function(e, field) {
      var group;
      group = $(field.element).closest(".form-group");
      if ($(".help-block", group).size() === 0) {
        group.append("<p class=\"help-block\" />");
      }
      return group.addClass("has-error").children(".help-block").show().text(field.message);
    }
  }, "[name]");
  $("form").on({
    "H5F:submit": function(e, inst, sub) {
      console.log("submit");
      return false;
    },
    "H5F:destroy": function(e) {
      console.log("destroy");
      $(".help-block", $(this)).remove();
      return $(".has-error", $(this)).removeClass("has-error");
    }
  });
  f1 = $("#form_1");
  f1.on("H5F:submit", function() {
    console.log("form_1 submit");
    return "form_1";
  });
  f1_inst = H5F.get(f1);
  f1_inst.addValidation("form_1_1", {
    handler: function() {
      return !isNaN(Number(this.value));
    },
    message: "啊哈哈"
  });
  f1_inst.addValidation("form_1_1", {
    handler: function() {
      return this.value.length > 5;
    },
    message: function() {
      return "长度不对";
    }
  });
  $("#form_2").on("H5F:submit", function() {
    console.log("form_2 submit");
    return "form_2";
  });
  return window.testForm = H5F.get($("#form_0"));
});

$(document).on({
  "H5F:enabled": function() {
    return console.log(this, "enabled");
  },
  "H5F:disabled": function() {
    return console.log(this, "disabled");
  }
}, "[name]");

window.addTestInput = function(type) {
  var form, id, idx;
  if (type == null) {
    type = "text";
  }
  form = $("#form_0");
  idx = $("[type='" + type + "']", form).size();
  id = "form_0_" + type + "_" + idx;
  return form.prepend("<div class=\"form-group\">\n  <label for=\"" + id + "\">" + id + "</label>\n  <input id=\"" + id + "\" class=\"form-control\" name=\"" + id + "\" type=\"" + type + "\" required=\"required\">\n</div>");
};
