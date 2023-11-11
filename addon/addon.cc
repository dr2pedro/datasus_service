// addon.cc
#include <node.h>
#include "dbc2dbf.h"

namespace demo {

  using v8::Context;
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Object;
  using v8::String;
  using v8::Value;

  void CreateObject(const FunctionCallbackInfo<Value>& args) {
    
    Isolate* isolate = args.GetIsolate();
    Local<Context> context = isolate->GetCurrentContext();

    if (!args[0]->IsObject()) {
      isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "Argument should be an object").ToLocalChecked()));
      return;
    }
    
    Local<Object> obj = args[0]->ToObject(context).ToLocalChecked();

    if (!obj->Has(context, v8::String::NewFromUtf8(isolate, "input").ToLocalChecked()).FromJust() || !obj->Has(context, v8::String::NewFromUtf8(isolate, "output").ToLocalChecked()).FromJust()) {
      isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "Object should have 'input' and 'output' properties").ToLocalChecked()));
      return;
    }

    Local<Value> input = obj->Get(context, String::NewFromUtf8(isolate, "input").ToLocalChecked()).ToLocalChecked();
    Local<Value> output = obj->Get(context, String::NewFromUtf8(isolate, "output").ToLocalChecked()).ToLocalChecked();

    if (!input->IsString() || !output->IsString()) {
      isolate->ThrowException(v8::Exception::TypeError(v8::String::NewFromUtf8(isolate, "Both 'input' and 'output' properties should be strings").ToLocalChecked()));
      return;
    }

    v8::String::Utf8Value inputPath(isolate, input);
    v8::String::Utf8Value outputPath(isolate, output);

    char* inputPathStr = *inputPath;
    char* outputPathStr = *outputPath;
    
    dbc2dbf(&inputPathStr, &outputPathStr);

    printf("Decompressed successful.\n");

    args.GetReturnValue().Set(obj);
  }

  void Init(Local<Object> exports, Local<Object> module) {
    NODE_SET_METHOD(module, "exports", CreateObject);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo